import * as React from "react";
import {
  ChevronsUpDown,
  LayoutGrid,
  LogOut,
  MapPin,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Routes } from "@/resources/Slug";
import { ThemeToggle } from "@/components/ThemeToggle";
import api from "@/api/axios";
import { User } from "@/types/user";
import { getShortName } from "@/utils/string";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BKK Branch",
      logo: MapPin,
      plan: "Enterprise",
    },
    {
      name: "TTP Branch.",
      logo: MapPin,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: MapPin,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Trainees",
      url: "/trainee",
      icon: Users,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const [userInfo, setUserInfo] = React.useState<User>();

  const handleLogout = () => {
    secureLocalStorage.clear();
    navigate(Routes.LOGIN);
  };

  const fetchUserInfo = async () => {
    const res = await api.get("/api/users/me?fields=*");

    if (res?.data?.data) {
      setUserInfo(res.data.data);
    }
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-sm leading-tight text-left">
                      <span className="font-semibold truncate">
                        {activeTeam.name}
                      </span>
                      <span className="text-xs truncate">
                        {activeTeam.plan}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  {data.teams.map((team) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex items-center justify-center border rounded-sm size-6">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith(item.url)}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="w-8 h-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={userInfo?.first_name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {getShortName(
                          userInfo?.first_name,
                          userInfo?.last_name
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-sm leading-tight text-left">
                      <span className="font-semibold truncate">
                        {userInfo?.first_name}
                      </span>
                      <span className="text-xs truncate">
                        {userInfo?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="w-8 h-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {getShortName(
                            userInfo?.first_name,
                            userInfo?.last_name
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-sm leading-tight text-left">
                        <span className="font-semibold truncate">
                          {userInfo?.first_name}
                        </span>
                        <span className="text-xs truncate">
                          {userInfo?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b shrink-0 bg-background">
          <div className="flex items-center justify-between gap-2 ">
            <SidebarTrigger className="-ml-1" />
            {/* <Separator orientation="vertical" className="h-4 mr-2" /> */}
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <ThemeToggle />
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
