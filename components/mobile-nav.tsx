"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-teal-600" />
          <span className="font-bold text-xl">PDF Wizard</span>
        </Link>

        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
        </div>
      </div>

      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <FileText className="h-6 w-6 text-teal-600" />
              <span className="font-bold text-xl">PDF Wizard</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard" ? "bg-gray-100" : "")}
              >
                Dashboard
              </Button>
            </Link>

            <div className="px-3 text-sm font-medium">PDF Tools</div>

            <Link href="/dashboard/merge" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/merge" ? "bg-gray-100" : "")}
              >
                Merge PDFs
              </Button>
            </Link>

            <Link href="/dashboard/compress" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/compress" ? "bg-gray-100" : "")}
              >
                Compress PDF
              </Button>
            </Link>

            <Link href="/dashboard/sign" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/sign" ? "bg-gray-100" : "")}
              >
                Sign PDF
              </Button>
            </Link>

            <Link href="/dashboard/convert" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/convert" ? "bg-gray-100" : "")}
              >
                Convert Files
              </Button>
            </Link>

            <Link href="/dashboard/split" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/split" ? "bg-gray-100" : "")}
              >
                Split PDF
              </Button>
            </Link>

            <Link href="/dashboard/extract" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/extract" ? "bg-gray-100" : "")}
              >
                Extract Text
              </Button>
            </Link>

            <div className="border-t my-4"></div>

            <Link href="/dashboard/history" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/history" ? "bg-gray-100" : "")}
              >
                File History
              </Button>
            </Link>

            <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/dashboard/settings" ? "bg-gray-100" : "")}
              >
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
