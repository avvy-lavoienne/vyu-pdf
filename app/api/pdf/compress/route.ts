import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { compressPDF } from "@/lib/pdf-utils"

export async function POST(request: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "PDF file is required" }, { status: 400 })
    }

    // Convert file to ArrayBuffer
    const pdfBuffer = await file.arrayBuffer()

    // Compress PDF
    const compressedPdfBytes = await compressPDF(pdfBuffer)

    // In a real application, you would save the file to storage and database
    // For this example, we'll just return the compressed PDF

    return new NextResponse(compressedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="compressed_${file.name}"`,
      },
    })
  } catch (error) {
    console.error("Error in compress PDF route:", error)
    return NextResponse.json({ error: "Failed to compress PDF file" }, { status: 500 })
  }
}
