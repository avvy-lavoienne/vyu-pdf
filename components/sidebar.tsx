"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useClerk } from "@clerk/nextjs"
import { FileText, Merge, FileDown, Pen, LayoutDashboard, History, Settings, FileUp, Scissors } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useClerk()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "PDF Tools",
      icon: FileText,
      subItems: [
        {
          label: "Merge PDFs",
          icon: Merge,
          href: "/dashboard/merge",
          active: pathname === "/dashboard/merge",
        },
        {
          label: "Compress PDF",
          icon: FileDown,
          href: "/dashboard/compress",
          active: pathname === "/dashboard/compress",
        },
        {
          label: "Sign PDF",
          icon: Pen,
          href: "/dashboard/sign",
          active: pathname === "/dashboard/sign",
        },
        {
          label: "Convert Files",
          icon: FileText,
          href: "/dashboard/convert",
          active: pathname === "/dashboard/convert",
        },
        {
          label: "Split PDF",
          icon: Scissors,
          href: "/dashboard/split",
          active: pathname === "/dashboard/split",
        },
        {
          label: "Extract Text",
          icon: FileUp,
          href: "/dashboard/extract",
          active: pathname === "/dashboard/extract",
        },
      ],
    },
    {
      label: "File History",
      icon: History,
      href: "/dashboard/history",
      active: pathname === "/dashboard/history",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-teal-600" />
          <span className="font-bold text-xl">PDF Wizard</span>
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        {routes.map((route) => {
          if (route.subItems) {
            return (
              <Collapsible key={route.label} className="w-full">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1">
                  {route.subItems.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href}>
                      <Button
                        variant="ghost"
                        className={cn("w-full justify-start gap-2 font-normal", subItem.active ? "bg-gray-100" : "")}
                      >
                        <subItem.icon className="h-4 w-4" />
                        {subItem.label}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          }

          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start gap-2 font-normal", route.active ? "bg-gray-100" : "")}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
          <div className="text-sm">
            <p className="font-medium">Account</p>
          </div>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
