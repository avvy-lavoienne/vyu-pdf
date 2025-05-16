import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SplitPDFPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Split PDF</h1>
        <p className="text-muted-foreground">Extract specific pages from your PDF document</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Split PDF</CardTitle>
          <CardDescription>Upload a PDF file and specify which pages to extract.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FileUploader
              endpoint="splitPdf"
              allowMultiple={false}
              acceptedFileTypes={{
                "application/pdf": [".pdf"],
              }}
            />

            <div className="space-y-4">
              <div>
                <Label htmlFor="page-range">Page Range</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input id="page-range" placeholder="e.g., 1-3, 5, 7-9" className="flex-1" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Specify page ranges separated by commas (e.g., 1-3, 5, 7-9)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="extract-all" className="rounded" />
                <Label htmlFor="extract-all">Extract each page to a separate PDF</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
