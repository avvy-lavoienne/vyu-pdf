import { FileText, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would normally fetch from your database
async function getRecentFiles(userId: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  return [
    {
      id: "1",
      name: "Business_Proposal.pdf",
      type: "pdf",
      size: 2.4,
      createdAt: new Date(2025, 4, 10),
      operation: "merge",
    },
    {
      id: "2",
      name: "Contract_Signed.pdf",
      type: "pdf",
      size: 1.8,
      createdAt: new Date(2025, 4, 12),
      operation: "sign",
    },
    {
      id: "3",
      name: "Report_Compressed.pdf",
      type: "pdf",
      size: 0.9,
      createdAt: new Date(2025, 4, 14),
      operation: "compress",
    },
    {
      id: "4",
      name: "Presentation.pdf",
      type: "pdf",
      size: 3.2,
      createdAt: new Date(2025, 4, 15),
      operation: "convert",
    },
  ]
}

export default async function RecentFiles({ userId }: { userId: string }) {
  const files = await getRecentFiles(userId)

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No recent files found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Operation</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Size</th>
            <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm capitalize">{file.operation}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-600">{file.createdAt.toLocaleDateString()}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-600">{file.size} MB</span>
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
