"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Topbar from "@/components/topbar";
import WatchlistPage from "@/components/watchlist-page";
import BuilderPage from "@/components/builder-page";
import withAuth from "@/hoc/withAuth";
import { UserAuth } from "@/context/AuthContext";

function Home() {
  const { user } = UserAuth();
  const [currentComponent, setCurrentComponent] = useState("/watchlist");

  const handleNavigation = (component: string) => {
    setCurrentComponent(component);
  };

  let Component = WatchlistPage;
  switch (currentComponent) {
    case "/watchlist":
      Component = WatchlistPage;
      break;
    case "/builder":
      Component = BuilderPage;
      break;
    default:
      Component = WatchlistPage;
      break;
  }

  return user ? (
    <div className="hidden md:block min-h-screen">
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
  ) : null;
}

export default withAuth(Home);
