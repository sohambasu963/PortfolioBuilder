"use client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CardSignUp } from "@/app/signup/components/card-signup";
// import { Logo } from '@/components/ui/logo';
import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function SignUp() {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="bg-cream container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 font-bricolage-grotesque",
          )}
        >
          Login
        </Link>
        <div className="relative h-screen hidden flex-col bg-muted mt-8 pt-6 p-10 text-white dark:border-r lg:flex">
          {/* <div className="absolute inset-0 bg-black" /> */}
          <AnimatePresence>
            <motion.div
              className="absolute inset-0 bg-primary flex items-center justify-center"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Image src={"/images/logo.svg"} width={400} height={400} alt="Logo" />
            </motion.div>
          </AnimatePresence>
          <div className="relative z-20 flex items-center font-medium">
            <h1 className="text-cream text-2xl font-eb-garamond">
              Portfolio Builder
            </h1>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-cream text-lg mb-6 font-bricolage-grotesque">
                Building portfolios is hard. We make it easy.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-semibold font-eb-garamond">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground font-bricolage-grotesque">
                Enter your email below to create your account
              </p>
            </div>
            <CardSignUp />
            <p className="px-8 text-center text-sm text-muted-foreground font-bricolage-grotesque">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
