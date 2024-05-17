import * as React from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import Slug from "@/resources/Slug";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const routes: { title: string; href: string; description: string }[] = [
  {
    title: "Home Page",
    href: "/",
    description: "Route To Home Page",
  },
  {
    title: "About",
    href: "/about",
    description: "Route to the about page.",
  },
  {
    title: "Products",
    href: "/products",
    description: "Route to the products page.",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Route to the contact us page.",
  },
];

function NavigationMenuDemo() {
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem
          onClick={() => navigate("/")}
          className="cursor-pointer">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Routes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {routes?.map((route) => (
                <Link to={route.href} key={route.href}>
                  <ListItem key={route.title} title={route.title}>
                    {route.description}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export const PublicLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <div className="flex justify-between my-2">
        <NavigationMenuDemo />

        <div className="flex gap-2">
          <ThemeToggle />
          <Link to={Slug.LOGIN}>
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
      <Separator />

      <div className="container">{children}</div>
    </div>
  );
};

export default PublicLayout;
