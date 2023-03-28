import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@server/api/trpc';
import { prisma } from '@src/server/db';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '@src/env.mjs';

export const exampleRouter = createTRPCRouter({
  updateProfilePicture: protectedProcedure
    .input(
      z.object({
        version_number: z.number(),
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
            version: input.version_number,
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
});
