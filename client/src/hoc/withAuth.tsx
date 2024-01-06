import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const Router = useRouter();
    const { user, loading } = UserAuth();

    useEffect(() => {
      if (!loading && !user) {
        Router.push('/login');
      }
    }, [user, loading]);

    if (loading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;