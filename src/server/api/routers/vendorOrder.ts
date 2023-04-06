import { z } from 'zod';
import { createTRPCRouter, protectedVendorProcedure } from '@server/api/trpc';
import { prisma } from '@src/server/db';

export const vendorOrderRouter = createTRPCRouter({
  getAllOrders: protectedVendorProcedure
    .input(
      z.object({
        orderState: z.enum([
          'CANCELLED',
          'PENDING',
          'PROCESSSING',
          'DONE',
          'ALL',
        ]),
      })
    )
    .query(async ({ ctx, input }) => {
      const orders = await (input.orderState !== 'ALL'
        ? prisma.order.findMany({
            where: {
              vendorId: ctx.session.user.id,
              orderState: input.orderState,
            },
          })
        : prisma.order.findMany({
            where: {
              vendorId: ctx.session.user.id,
            },
          }));
      return orders;
    }),
});
