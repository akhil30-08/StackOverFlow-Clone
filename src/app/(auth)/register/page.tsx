'use client';

import { useAuthStore } from '@/store/Auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from '@/lib/Schemas/registerSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { IconLoader2 } from '@tabler/icons-react';

const Register = () => {
  const { createAccount } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { name, email, password } = values;

    try {
      setIsLoading(true);
      const response = await createAccount(name, email, password);
      console.log(response);
      if (response.success) {
        toast({
          title: 'Account created successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'An Error Occured',
          description: response.error?.message,
        });
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response.message);
    } finally {
      setIsLoading(false);
      form.reset();
      router.push('/login');
    }
  }

  return (
    <section className='w-full max-w-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe@gmail.com' {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading} className='max-w-20'>
            {isLoading ? <IconLoader2 /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Register;
