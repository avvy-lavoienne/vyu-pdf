import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompressPDFPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compress PDF</h1>
        <p className="text-muted-foreground">Reduce the file size of your PDF while maintaining quality</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compress PDF</CardTitle>
          <CardDescription>
            Upload a PDF file to compress. Choose the compression level that suits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Compression</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <FileUploader
                endpoint="compressPdf"
                allowMultiple={false}
                acceptedFileTypes={{
                  "application/pdf": [".pdf"],
                }}
              />
            </TabsContent>
            <TabsContent value="advanced">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="compression-level" className="text-sm font-medium">
                    Compression Level
                  </label>
                  <select id="compression-level" className="w-full p-2 border rounded-md">
                    <option value="low">Low (Better Quality)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Smaller Size)</option>
                  </select>
                  <p className="text-xs text-gray-500">Higher compression may reduce image quality in the PDF.</p>
                </div>

                <FileUploader
                  endpoint="compressPdf"
                  allowMultiple={false}
                  acceptedFileTypes={{
                    "application/pdf": [".pdf"],
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
