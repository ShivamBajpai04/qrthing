"use client";

import type React from "react";

import Link from "next/link";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  QrCode,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true} open={true}>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        <Sidebar collapsible="none">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <QrCode className="h-6 w-6" />
              <span>QRThing</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/create">
                  <SidebarMenuButton>
                    <PlusCircle className="h-4 w-4" />
                    <span>Create</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/manage">
                  <SidebarMenuButton>
                    <QrCode className="h-4 w-4" />
                    <span>Manage</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/analytics">
                  <SidebarMenuButton>
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  <span>John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col">
          {" "}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:px-8">
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6 md:gap-8 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
