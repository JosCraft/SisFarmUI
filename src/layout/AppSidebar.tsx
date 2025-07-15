import { LayoutDashboard, Users, ShoppingBag, Truck, PackageIcon } from "lucide-react" // Renombrar Package para evitar conflicto
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function AppSidebar() {

  const pathname = window.location.pathname // Usar window.location.pathname para obtener la ruta actual

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Usuarios",
      url: "/dashboard/usuarios",
      icon: Users,
    },
    {
      title: "Clientes",
      url: "/dashboard/clients",
      icon: ShoppingBag,
    },
    {
      title: "Proveedores",
      url: "/dashboard/proveedores",
      icon: Truck,
    },
    {
      title: "Productos",
      url: "/dashboard/products",
      icon: PackageIcon, // Usar el icono renombrado
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon">
      {" "}
      {/* Usamos variant="inset" y collapsible="icon" */}
      <SidebarHeader>
        {/* Puedes añadir un logo o título aquí si lo deseas, se colapsará con el sidebar */}
        <div className="flex items-center justify-center p-2">
          <div className="w-8 h-8 bg-pharmacy-primary rounded-lg flex items-center justify-center">
            <PackageIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-text-heading ml-2 group-data-[state=collapsed]:hidden">
            Farmacia
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Puedes añadir un footer aquí si lo deseas */}
      {/* <SidebarFooter>
        <p className="text-xs text-text-muted group-data-[state=collapsed]:hidden">© 2023 Farmacia</p>
      </SidebarFooter> */}
    </Sidebar>
  )
}
