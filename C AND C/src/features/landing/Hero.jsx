import { useRef, useEffect } from "react";
import gsap from "gsap";
import Button from "../../components/UI/Button";

export default function Hero({ onExplore }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image zoom-in
      tl.fromTo(
        imageRef.current,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8 }
      );

      // Split title into letters for stagger
      const titleEl = titleRef.current;
      const text = titleEl.textContent;
      titleEl.textContent = "";
      const letters = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        titleEl.appendChild(span);
        return span;
      });

      tl.to(
        letters,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=1.0"
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src="/images/hero.png"
          alt="Cup & Cozy Café"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-8">
          <span className="text-sm">☕</span>
          <span className="text-white/90 text-xs font-medium tracking-widest uppercase">
            Artisan Coffee House
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          style={{ willChange: "contents" }}
        >
          Cup & Cozy
        </h1>

        <p
          ref={taglineRef}
          className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          Where warmth meets flavor. Handcrafted coffee, artisan bites, and a
          space that feels like home — one cup at a time.
        </p>

        <div ref={ctaRef} className="opacity-0">
          <Button
            variant="accent"
            size="lg"
            onClick={onExplore}
            className="!rounded-full !px-10"
          >
            Explore Menu
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
