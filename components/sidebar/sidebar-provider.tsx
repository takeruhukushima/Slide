"use client"

import type React from "react"
import { SidebarProvider as ShadcnSidebarProvider } from "@/components/ui/sidebar"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return <ShadcnSidebarProvider defaultOpen={true}>{children}</ShadcnSidebarProvider>
}
