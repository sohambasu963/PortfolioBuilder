"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Topbar from "@/components/topbar";
import DashboardPage from "@/components/dashboard-page";
import PortfolioPage from "@/components/portfolio-page";
import SentimentPage from "@/components/sentiment-page";
import withAuth from "@/hoc/withAuth";
import { UserAuth } from "@/context/AuthContext";

function Home() {
  const { user } = UserAuth();
  const [currentComponent, setCurrentComponent] = useState("/dashboard");

  const handleNavigation = (component: string) => {
    setCurrentComponent(component);
  };

  let Component = DashboardPage;
  switch (currentComponent) {
    case "/dashboard":
      Component = DashboardPage;
      break;
    case "/portfolio":
      Component = PortfolioPage;
      break;
    case "/sentiment":
      Component = SentimentPage;
      break;
    default:
      Component = DashboardPage;
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
