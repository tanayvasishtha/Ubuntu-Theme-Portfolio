import type React from "react"
import type { Metadata } from "next"
import { Ubuntu, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ubuntu Portfolio | Developer Desktop",
  description: "Interactive Ubuntu-themed portfolio showcasing development projects and skills",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased dark">{children}</body>
    </html>
  )
}
