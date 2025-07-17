import { Package, Home, ShoppingCart, Settings, ClipboardList, Sun, Moon, BarChart3 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Productos",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "Productos",
          url: "/dashboard/productos",
          isActive: true,
        },
        {
          title: "Ventas",
          url: "/dashboard/ventas",
          isActive: true,
        },
      ],
    },
    {
      title: "Opciones",
      url: "/dashboard/opciones",
      icon: Settings,
    },
    {
      title: "Ventas",
      url: "/dashboard/ventas",
      icon: ShoppingCart,
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: ClipboardList,
    },
    {
      title: "Reportes",
      url: "/dashboard/reportes",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [theme, setTheme] = useState<"light" | "dark">("light")

  return (
    <Sidebar
      className="border-r-0 bg-slate-200"
      {...props}
    >
      <SidebarHeader className="border-b border-blue-400/30 pb-4">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-lg"></div>
          <span className="text-xl font-semibold text-white">Inventory</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="text-white hover:bg-blue-500/50 data-[active=true]:bg-blue-500/50"
                          isActive={item.isActive}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                                className="text-blue-100 hover:text-white hover:bg-blue-500/30 data-[active=true]:bg-blue-500/50 data-[active=true]:text-white"
                              >
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild className="text-white hover:bg-blue-500/50">
                      <a href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-400/30 pt-4">
        <div className="flex gap-2 px-2">
          <Button
            variant={theme === "light" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTheme("light")}
            className="flex-1 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Sun className="w-3 h-3 mr-1" />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="flex-1 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Moon className="w-3 h-3 mr-1" />
            Dark
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
