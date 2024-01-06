"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Topbar from "@/components/topbar";
import PlaygroundPage from "@/components/playground-page";
import withAuth from "@/hoc/withAuth";

function Home() {
  const [currentComponent, setCurrentComponent] = useState("/playground");

  const handleNavigation = (component: string) => {
    setCurrentComponent(component);
  };

  let Component = PlaygroundPage;
  switch (currentComponent) {
    case "/playground":
      Component = PlaygroundPage;
      break;
    default:
      Component = PlaygroundPage;
      break;
  }

  return (
    <div className="hidden md:block">
      <Topbar />
      <div className="border-t">
        <div className="grid lg:grid-cols-7">
          <Navbar
            className="hidden lg:block"
            navigateTo={handleNavigation}
            currentComponent={currentComponent}
          />
          <div className="col-span-6 lg:border-l">
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
