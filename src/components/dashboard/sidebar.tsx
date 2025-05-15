"use client";
import Link from "next/link";
import { BarChart3, Grid, PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export const dashboardNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <Grid className="h-5 w-5" />,
  },
  {
    title: "Create QR",
    href: "/dashboard/create",
    icon: <PlusCircle className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Manage QRs",
    href: "/dashboard/manage",
    icon: <Settings className="h-5 w-5" />,
  },
];
