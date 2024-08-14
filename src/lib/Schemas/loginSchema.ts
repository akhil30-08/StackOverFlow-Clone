import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Password must be atleast 5 characters long' }),
});
