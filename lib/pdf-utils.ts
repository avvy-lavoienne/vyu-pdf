import { PDFDocument } from "pdf-lib"

/**
 * Merges multiple PDF files into a single PDF
 */
export async function mergePDFs(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  try {
    const mergedPdf = await PDFDocument.create()

    for (const pdfBuffer of pdfBuffers) {
      const pdf = await PDFDocument.load(pdfBuffer)
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page)
      })
    }

    return await mergedPdf.save()
  } catch (error) {
    console.error("Error merging PDFs:", error)
    throw new Error("Failed to merge PDF files")
  }
}

/**
 * Compresses a PDF file
 * Note: This is a simplified version. Real compression would involve more complex techniques.
 */
export async function compressPDF(pdfBuffer: ArrayBuffer): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer, {
      ignoreEncryption: true,
    })

    // In a real implementation, you would apply compression techniques here

    return await pdfDoc.save()
  } catch (error) {
    console.error("Error compressing PDF:", error)
    throw new Error("Failed to compress PDF file")
  }
}

/**
 * Adds a digital signature to a PDF
 * Note: This is a simplified version. Real digital signing would involve cryptographic operations.
 */
export async function signPDF(
  pdfBuffer: ArrayBuffer,
  signatureImageBuffer: ArrayBuffer,
  pageNumber: number,
  x: number,
  y: number,
  width: number,
  height: number,
): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    const signatureImage = await pdfDoc.embedPng(signatureImageBuffer)

    const pages = pdfDoc.getPages()
    const page = pages[pageNumber - 1]

    page.drawImage(signatureImage, {
      x,
      y,
      width,
      height,
    })

    return await pdfDoc.save()
  } catch (error) {
    console.error("Error signing PDF:", error)
    throw new Error("Failed to sign PDF file")
  }
}

/**
 * Splits a PDF into multiple PDFs based on page ranges
 */
export async function splitPDF(
  pdfBuffer: ArrayBuffer,
  pageRanges: { start: number; end: number }[],
): Promise<Uint8Array[]> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    const totalPages = pdfDoc.getPageCount()

    const splitPdfs: Uint8Array[] = []

    for (const range of pageRanges) {
      const newPdf = await PDFDocument.create()

      const start = Math.max(0, range.start - 1)
      const end = Math.min(totalPages - 1, range.end - 1)

      const pagesToCopy = []
      for (let i = start; i <= end; i++) {
        pagesToCopy.push(i)
      }

      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToCopy)
      copiedPages.forEach((page) => {
        newPdf.addPage(page)
      })

      splitPdfs.push(await newPdf.save())
    }

    return splitPdfs
  } catch (error) {
    console.error("Error splitting PDF:", error)
    throw new Error("Failed to split PDF file")
  }
}
