import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 container max-w-4xl mx-auto p-4">
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Welcome to AI Employee</h3>
          <p className="text-muted-foreground max-w-md">
            Your AI assistant is ready to help. Click the chat icon to get started!
          </p>
        </div>
      </div>
    </main>
  )
}
