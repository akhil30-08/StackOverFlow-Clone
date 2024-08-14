import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(100, { message: 'Must be 100 or fewer characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Password must be 5 or more characters long' }),
});
