import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConvertFilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Convert Files</h1>
        <p className="text-muted-foreground">Convert files between different formats</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Convert Files</CardTitle>
          <CardDescription>Select the conversion type and upload your files.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="to-pdf">
            <TabsList className="mb-4">
              <TabsTrigger value="to-pdf">To PDF</TabsTrigger>
              <TabsTrigger value="from-pdf">From PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="to-pdf">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="source-format" className="text-sm font-medium">
                    Source Format
                  </label>
                  <select id="source-format" className="w-full p-2 border rounded-md">
                    <option value="jpg">JPG/JPEG</option>
                    <option value="docx">Word (DOCX)</option>
                    <option value="pptx">PowerPoint (PPTX)</option>
                    <option value="xlsx">Excel (XLSX)</option>
                  </select>
                </div>

                <FileUploader
                  endpoint="convertToPdf"
                  allowMultiple={true}
                  acceptedFileTypes={{
                    "image/jpeg": [".jpg", ".jpeg"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="from-pdf">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="target-format" className="text-sm font-medium">
                    Target Format
                  </label>
                  <select id="target-format" className="w-full p-2 border rounded-md">
                    <option value="jpg">JPG/JPEG</option>
                    <option value="docx">Word (DOCX)</option>
                    <option value="txt">Text (TXT)</option>
                  </select>
                </div>

                <FileUploader
                  endpoint="convertFromPdf"
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
