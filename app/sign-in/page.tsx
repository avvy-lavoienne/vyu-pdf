import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-teal-600">Sign In to PDF Wizard</h1>
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none border border-gray-200 rounded-lg",
              formButtonPrimary: "bg-teal-600 hover:bg-teal-700 text-white font-semibold",
              headerTitle: "text-teal-600 text-xl font-bold",
              headerSubtitle: "text-gray-600",
            },
          }}
          routing="hash"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}
