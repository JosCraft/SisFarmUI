import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Header } from "./Header"
import { Outlet } from "react-router-dom"

export default function LayoutDashboard() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar /> {/* Nuestro sidebar */}
      <SidebarInset>
        <Header /> {/* Nuestro header */}
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
