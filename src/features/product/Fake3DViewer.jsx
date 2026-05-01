import { useState, useRef, useCallback } from "react";

export default function Fake3DViewer({ image, name }) {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -20;
    const rotateY = (x - 0.5) * 20;

    setTransform({ rotateX, rotateY, scale: 1.05 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
          width="400"
          height="400"
        />

        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(${105 + transform.rotateY * 3}deg, rgba(255,255,255,${0.1 + Math.abs(transform.rotateY) * 0.01}) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <span className="text-xs text-text-light bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          ↔ Move mouse to view in 3D
        </span>
      </div>
    </div>
  );
}
