import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignPDFPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sign PDF</h1>
        <p className="text-muted-foreground">Add digital signatures to your PDF documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF to Sign</CardTitle>
          <CardDescription>Upload a PDF file that you want to add a digital signature to.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader
            endpoint="signPdf"
            allowMultiple={false}
            acceptedFileTypes={{
              "application/pdf": [".pdf"],
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
