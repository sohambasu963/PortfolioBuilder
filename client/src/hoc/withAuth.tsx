import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { user, loading } = UserAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
