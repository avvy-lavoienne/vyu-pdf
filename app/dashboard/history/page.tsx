import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecentFiles from "@/components/recent-files"
import LoadingFiles from "@/components/loading-files"

export default async function HistoryPage() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">File History</h1>
        <p className="text-muted-foreground">View and manage your processed files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Files</CardTitle>
          <CardDescription>All your processed files are stored securely for 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="merged">Merged</TabsTrigger>
              <TabsTrigger value="compressed">Compressed</TabsTrigger>
              <TabsTrigger value="signed">Signed</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Suspense fallback={<LoadingFiles />}>
                <RecentFiles userId={userId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="merged">
              <Suspense fallback={<LoadingFiles />}>
                <RecentFiles userId={userId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="compressed">
              <Suspense fallback={<LoadingFiles />}>
                <RecentFiles userId={userId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="signed">
              <Suspense fallback={<LoadingFiles />}>
                <RecentFiles userId={userId} />
              </Suspense>
            </TabsContent>
            <TabsContent value="converted">
              <Suspense fallback={<LoadingFiles />}>
                <RecentFiles userId={userId} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
