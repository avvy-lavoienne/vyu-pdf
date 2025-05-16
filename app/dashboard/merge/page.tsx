import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MergePDFPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Merge PDFs</h1>
        <p className="text-muted-foreground">Combine multiple PDF files into a single document</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Upload the PDF files you want to merge. You can reorder them before merging.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader
            endpoint="mergePdfs"
            allowMultiple={true}
            acceptedFileTypes={{
              "application/pdf": [".pdf"],
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
