import type React from "react"
import "@/app/globals.css"
import { MainSidebar } from "@/components/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <title>Slide - スライド資料管理システム</title>
        <meta name="description" content="スライド資料を効率的に管理するためのシステム" />
      </head>
      <body className="flex h-screen overflow-hidden">
        <MainSidebar />
        <main className="flex-1 overflow-auto bg-gray-50">
          <header className="app-header bg-white p-4">
            <h1 className="text-xl font-semibold tracking-wide logo-text">slide</h1>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
