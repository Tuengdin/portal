"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { AuthBtn } from "../btns/auth-btn"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Map",
    href: "/map",
    description:
      "What's around 42 Bangkok?",
  },
  {
    title: "Who's on site?",
    href: "/who-s-on-site",
    description:
      "Check if your friend is on site",
  }
]

const no_renders = [
  '/login'
]

export function NavBar() {
  const pathname = usePathname()
  const session = useSession()
  const user = session.data?.user
  if (no_renders.includes(pathname)) return null
  return (
    <NavigationMenu className="p-1 m-1">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Portal
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {user?.login}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {user?.name}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="sub-menu-1">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/" title="sub-menu-1">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="sub-menu-3">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
              <Button
                onClick={() => { signOut({ callbackUrl: "/login" }) }}
                variant={"destructive"}
              >
                Sign Out
              </Button>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
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
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
