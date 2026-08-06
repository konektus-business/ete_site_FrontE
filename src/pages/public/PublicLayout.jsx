import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { PublicHeader } from "../../components/layout/PublicHeader";

export default function PublicLayout() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Header */}
      <div className="absolute inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6 lg:px-0">
        <PublicHeader />
      </div>

      {/* Main content */}
      <main className="flex w-full flex-1 flex-col items-center">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-[#3D7469] p-3 text-white shadow-lg transition hover:bg-[#2A5A4F] focus:outline-none focus:ring-2 focus:ring-[#3D7469]"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}