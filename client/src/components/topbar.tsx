import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { logOut } = UserAuth();
  const router = useRouter();

  const handleLogout = () => {
    try {
      logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary relative hidden h-[10vh] flex-col p-5 text-white dark:border-r lg:flex">
      <div className="flex justify-between items-center w-full text-black text-lg font-medium">
        {/* <Logo /> */}
        <h1 className="text-cream">Portfolio Builder</h1>
        <button
          onClick={handleLogout}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-cream text-md font-medium cursor-pointer hover:text-opacity-75",
          )}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
