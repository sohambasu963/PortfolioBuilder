import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Library,
  Store,
  FlaskConical,
  User,
  Settings,
  Bell,
  CreditCard,
  LogOut,
} from "lucide-react";

export default function Navbar({
  className,
  navigateTo,
  currentComponent,
}: React.HTMLAttributes<HTMLDivElement> & {
  navigateTo: (component: string) => void;
  currentComponent: string;
}) {
  return (
    <div className={cn("pb-12 bg-secondary h-[90vh]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Home
          </h2>
          <div className="space-y-1">
            <Button
              variant={currentComponent === "/watchlist" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigateTo("/watchlist")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Watchlist
            </Button>
            <Button
              variant={currentComponent === "/builder" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigateTo("/builder")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Builder
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <Button
            variant={currentComponent === "/profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => navigateTo("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant={currentComponent === "/settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => navigateTo("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant={currentComponent === "/logout" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => navigateTo("/logout")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
