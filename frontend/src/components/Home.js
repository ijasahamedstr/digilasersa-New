import { useEffect } from "react";
import FadeCarousel from "./Slider";
import NewHome from "./NewHome";

export default function Home() {

  // 🔹 Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Page Speed Optimizer Script (lazy load images & videos)
  useEffect(() => {
    const lazyElements = document.querySelectorAll("img[data-src], video[data-src]");

    if (!("IntersectionObserver" in window)) {
      lazyElements.forEach((el) => {
        if (el.dataset.src) {
          el.src = el.dataset.src;
          el.removeAttribute("data-src");
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute("data-src");
          }
          obs.unobserve(el);
        }
      });
    });

    lazyElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // --- Main Page Content ---
  return (
    <>
      <FadeCarousel />
      <NewHome />
    </>
  );
}
