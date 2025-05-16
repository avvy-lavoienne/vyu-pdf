import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { mergePDFs } from "@/lib/pdf-utils"

export async function POST(request: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length < 2) {
      return NextResponse.json({ error: "At least two PDF files are required" }, { status: 400 })
    }

    // Convert files to ArrayBuffer
    const pdfBuffers = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer()
        return arrayBuffer
      }),
    )

    // Merge PDFs
    const mergedPdfBytes = await mergePDFs(pdfBuffers)

    // In a real application, you would save the file to storage and database
    // For this example, we'll just return the merged PDF

    return new NextResponse(mergedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="merged_document.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error in merge PDF route:", error)
    return NextResponse.json({ error: "Failed to merge PDF files" }, { status: 500 })
  }
}
