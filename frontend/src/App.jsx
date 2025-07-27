import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./pages/LandingPage";
import DiabetesRisk from "./pages/DiabetesRisk";
import HeartRisk from "./pages/HeartRisk";
import CancerRisk from "./pages/CancerRisk";
import ChatBot from "./components/ChatBot";
import { Toaster } from "./components/ui/toast";
import Footer from "./components/Footer";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // ✅ Add this to listen for the "toggleChat" event
  useEffect(() => {
    const handleToggleChat = () => {
      setIsChatOpen((prev) => !prev);
    };

    document.addEventListener("toggleChat", handleToggleChat);

    // Clean up when App unmounts
    return () => {
      document.removeEventListener("toggleChat", handleToggleChat);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/diabetes" element={<DiabetesRisk />} />
            <Route path="/heart" element={<HeartRisk />} />
            <Route path="/cancer" element={<CancerRisk />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen((prev) => !prev)}
        />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
