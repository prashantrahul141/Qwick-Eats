import type { orderState } from '@prisma/client';
import { z } from 'zod';

const randomAddress = [
  '4040/4041, Chandivali Farm Road, Andheri(e), Mumbai',
  '38, Bagh Lingampally, Hyderabad',
  '18/48, Patel Nagar (e), Delhi',
  '22-7-238/a, Chatta Bazar, Hyderabad',
  'B-1, Bhagwati Chambers, Paldi, Ahmedabad',
  "31, Judge's Court Road, Alipore, Kolkata",
] as const;

const cloudinaryRequiredFieldsSchema = z.object({
  public_id: z.string(),
  version: z.number(),
  signature: z.string(),
});

const allOrderFilterOptions: Array<{
  title: string;
  value: orderState | 'ALL';
}> = [
  { title: 'All', value: 'ALL' },
  { title: 'Cancelled', value: 'CANCELLED' },
  { title: 'Done', value: 'DONE' },
  { title: 'Pending', value: 'PENDING' },
  { title: 'Processing', value: 'PROCESSSING' },
];

export { randomAddress, cloudinaryRequiredFieldsSchema, allOrderFilterOptions };
