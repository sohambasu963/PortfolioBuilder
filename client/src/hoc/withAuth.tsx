import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
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
};

export default withAuth;
