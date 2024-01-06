import React from "react";
import { UserAuth } from "@/context/AuthContext";

export default function PlaygroundPage() {
  const { user } = UserAuth();

  return (
    <div>
      <h1>Playground</h1>
    </div>
  );
}
