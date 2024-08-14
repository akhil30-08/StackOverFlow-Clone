'use client';

import { useAuthStore } from '@/store/Auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (session) {
    return null;
  }
  return (
    <main className='flex flex-col min-h-screen justify-center items-center p-6'>{children}</main>
  );
};

export default AuthLayout;
