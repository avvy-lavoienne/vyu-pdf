import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ExtractTextPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Extract Text</h1>
        <p className="text-muted-foreground">Extract text content from your PDF documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extract Text from PDF</CardTitle>
          <CardDescription>Upload a PDF file to extract its text content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FileUploader
              endpoint="extractText"
              allowMultiple={false}
              acceptedFileTypes={{
                "application/pdf": [".pdf"],
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="preserve-formatting" />
                <Label htmlFor="preserve-formatting">Preserve formatting (when possible)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="include-tables" />
                <Label htmlFor="include-tables">Attempt to extract tables</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="extract-images" />
                <Label htmlFor="extract-images">Extract images</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
