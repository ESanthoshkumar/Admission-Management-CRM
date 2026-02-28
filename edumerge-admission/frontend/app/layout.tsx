import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edumerge Admission BRS",
  description: "Admission Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex h-screen overflow-hidden`}>
        <ToastContainer position="bottom-right" />
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Edumerge BRS
            </h1>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <a href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white font-medium">
              Dashboard
            </a>
            <a href="/master-setup" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white font-medium">
              Master Setup
            </a>
            <a href="/applicants" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white font-medium">
              Applicants
            </a>
            <a href="/allocations" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white font-medium">
              Seat Allocation
            </a>
            <a href="/confirmations" className="block px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white font-medium">
              Confirmations
            </a>
          </nav>
          <div className="p-4 border-t border-slate-800 text-sm text-slate-500 text-center">
            Admissions Admin
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Admission Management System</h2>
            <div className="flex items-center space-x-4">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-inner">
                A
              </span>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
