import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarAIChat from "../ai/SidebarAIChat";

export default function Layout({ children }) {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌌 Global Animated Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-purple-900 via-black to-purple-800 animate-gradient" />

      {/* 🌑 Soft Dark Overlay (improves readability) */}
      <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-3xl" />

      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🏗 Main Layout */}
      <div className="flex h-[calc(100vh-64px)]">

        {/* 📂 Sidebar */}
        <Sidebar onAIChatClick={() => setShowAIChat(!showAIChat)} />

        {/* 📄 Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto 
                         bg-white/5 backdrop-blur-xl 
                         border border-white/10 
                         ">
          {children}
        </main>

        {/* 🤖 AI Chat Panel */}
        {showAIChat && (
          <aside className="absolute top-16 right-0 z-30 w-80 h-[calc(100vh-64px)] border-l border-white/10 
                            bg-white/5 backdrop-blur-xl shadow-2xl animate-slideIn">
            <SidebarAIChat />
          </aside>
        )}

      </div>
    </div>
  );
}
