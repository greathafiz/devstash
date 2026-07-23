import { AppSidebar } from "@/src/components/dashboard/AppSidebar"
import { TopBar } from "@/src/components/dashboard/TopBar"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
