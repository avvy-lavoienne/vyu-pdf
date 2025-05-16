import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Merge, FileDown, Pen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">PDF Wizard</span>
          </div>
          <div className="space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Your PDFs with Ease</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Powerful tools to merge, compress, sign, and convert your PDF files securely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our PDF Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="bg-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Merge className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Merge PDFs</h3>
                <p className="text-gray-600">Combine multiple PDF files into a single document with custom ordering.</p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="bg-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileDown className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compress PDFs</h3>
                <p className="text-gray-600">
                  Reduce file size while maintaining quality for easier sharing and storage.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="bg-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Pen className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign PDFs</h3>
                <p className="text-gray-600">Add digital signatures to your documents securely and professionally.</p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="bg-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Convert Files</h3>
                <p className="text-gray-600">Transform files between formats including JPG, Word, and PDF.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2025 PDF Wizard. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-teal-600">
                About
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-teal-600">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-teal-600">
                Privacy
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-teal-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
