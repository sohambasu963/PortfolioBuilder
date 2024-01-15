"use client";
import React, { useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UserAuth } from "@/context/AuthContext";

export function CardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { googleSignIn, signIn, user } = UserAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    method: string,
  ) => {
    e.preventDefault();

    if (method === "google") {
      try {
        await googleSignIn();
      } catch (googleError) {
        console.log("Google sign-in error:", googleError);
      }
    } else {
      try {
        await signIn(email, password);
      } catch (emailError) {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <Card>
      <form onSubmit={(e) => handleLogin(e, "email")}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-eb-garamond">Login</CardTitle>
          <CardDescription className="font-bricolage-grotesque">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bricolage-grotesque">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center font-bricolage-grotesque">
            <Button variant="outline" onClick={(e) => handleLogin(e, "google")}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
