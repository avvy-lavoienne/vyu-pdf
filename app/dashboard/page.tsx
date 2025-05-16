import { Suspense } from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { FileText, Merge, FileDown, Pen, FileUp, Scissors } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RecentFiles from "@/components/recent-files"
import LoadingFiles from "@/components/loading-files"

export default async function Dashboard() {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.firstName}</h1>
        <p className="text-muted-foreground">Here's an overview of your recent PDF activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard/merge">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Merge PDFs</CardTitle>
              <Merge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Combine multiple PDFs into one document</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/compress">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Compress PDF</CardTitle>
              <FileDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Reduce file size while maintaining quality</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/sign">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sign PDF</CardTitle>
              <Pen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Add digital signatures to your documents</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/convert">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Convert Files</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Convert between PDF, JPG, and Word formats</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/split">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Split PDF</CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Extract specific pages from your PDF</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/extract">
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Extract Text</CardTitle>
              <FileUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Extract text content from your PDF files</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
        <Suspense fallback={<LoadingFiles />}>
          <RecentFiles userId={userId} />
        </Suspense>
      </div>
    </div>
  )
}
