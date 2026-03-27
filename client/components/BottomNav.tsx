import { Link, useLocation } from "react-router-dom";
import { Home, Gamepad2, HardDrive, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/games", icon: Gamepad2, label: "Games" },
    { href: "/harddisks", icon: HardDrive, label: "Drives" },
    { href: "/accessories", icon: Package, label: "Accessories" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 h-16">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground/70"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
