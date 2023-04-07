import { z } from 'zod';
import { createTRPCRouter, protectedVendorProcedure } from '@server/api/trpc';
import { prisma } from '@src/server/db';

export const vendorOrderRouter = createTRPCRouter({
  updateOrderState: protectedVendorProcedure
    .input(
      z.object({
        targetState: z.enum(['PROCESSING', 'DONE', 'CANCELLED', 'PENDING']),
        targetOrderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.order.update({
        where: {
          id: input.targetOrderId,
        },
        data: {
          orderState: input.targetState,
        },
      });
    }),

  getAllOrders: protectedVendorProcedure
    .input(
      z.object({
        orderState: z.enum([
          'CANCELLED',
          'PENDING',
          'PROCESSING',
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
              AND: {
                orderState: input.orderState,
              },
            },
            include: {
              user: true,
              cartItems: {
                include: {
                  foodItem: true,
                },
              },
            },
          })
        : prisma.order.findMany({
            where: {
              vendorId: ctx.session.user.id,
            },
            include: {
              user: true,
              cartItems: {
                include: {
                  foodItem: true,
                },
              },
            },
          }));
      return orders;
    }),
});
