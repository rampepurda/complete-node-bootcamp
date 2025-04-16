import { z } from 'zod'

export const schema = {
  OrderPost: z.object({
    fullName: z.string().max(30, { message: 'Must be 20 or fewer characters long' }).min(4),
    email: z.string().email(),
    phone: z.string().max(9, { message: 'Phone number must have 9characters' }).min(9),
    payment: z
      .union([z.string(), z.boolean()])
      .default(false)
      .refine((value) => value, 'You must select one choice.'),
  }),
}
