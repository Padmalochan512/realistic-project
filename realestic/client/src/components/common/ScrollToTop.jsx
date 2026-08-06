import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Resets scroll immediately when changing pages
    });
  }, [pathname]);

  // 2. Toggle floating button visibility based on scroll depth
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. Smooth scroll handler for manual button click
  const scrollToTopSmooth = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTopSmooth}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer flex items-center justify-center border border-white/20"
        >
          <ArrowUp size={20} className="stroke-[2.5]" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;