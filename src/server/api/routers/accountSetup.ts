import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@server/api/trpc';
import { prisma } from '@src/server/db';

export const accountSetupRouter = createTRPCRouter({
  setupCustomer: protectedProcedure
    .input(z.object({ addr: z.string(), phoneNumber: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          accountSetupDone: true,
        },
      });

      if (user && !user.accountSetupDone) {
        await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            address: input.addr,
            phoneNumber: input.phoneNumber,

            accountSetupDone: true,
            role: 'CUSTOMER',
          },
        });
      }
    }),

  setupVendor: protectedProcedure
    .input(
      z.object({
        companyName: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        companyBio: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          accountSetupDone: true,
        },
      });

      if (user && !user.accountSetupDone) {
        await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            companyName: input.companyName,
            address: input.address,
            phoneNumber: input.phoneNumber,
            companyBio: input.companyBio,
            role: 'VENDOR',
            accountSetupDone: true,
          },
        });
      }
    }),
});
