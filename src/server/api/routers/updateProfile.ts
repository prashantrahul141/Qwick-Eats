import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  protectedCustomerProcedure,
} from '@server/api/trpc';
import { prisma } from '@src/server/db';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '@src/env.mjs';

export const updateProfileRouter = createTRPCRouter({
  updateProfilePicture: protectedProcedure
    .input(
      z.object({
        version: z.number(),
        public_id: z.string(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (user) {
        const expectedSignature = cloudinary.utils.api_sign_request(
          {
            public_id: input.public_id,
            version: input.version,
          },
          env.TOKEN_CLOUDINARY_API_SECRET
        );
        if (input.signature === expectedSignature) {
          await prisma.user.update({
            where: {
              id: ctx.session.user.id,
            },
            data: {
              image: `https://res.cloudinary.com/${env.NEXT_PUBLIC_TOKEN_CLOUDINARY_CLOUD_NAME}/image/upload/${input.public_id}`,
            },
          });
        }
      }
    }),

  updateCustomerInfo: protectedCustomerProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
    }),

  updateVendorInfo: protectedCustomerProcedure
    .input(
      z.object({
        companyName: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
