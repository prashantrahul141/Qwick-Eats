import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@server/api/trpc';
import { env } from '@src/env.mjs';
import { v2 as cloudinary } from 'cloudinary';

export const exampleRouter = createTRPCRouter({
  getCloudinarySignature: protectedProcedure.input(z.object({})).query(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      env.TOKEN_CLOUDINARY_API_SECRET
    );

    return { timestamp: timestamp.toString(), signature };
  }),
});
