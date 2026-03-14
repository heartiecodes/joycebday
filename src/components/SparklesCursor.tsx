import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
}

const SparklesCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animRef = useRef<number>(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (dist < 3) return;

      sparklesRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        size: Math.random() * 2.5 + 0.8,
        opacity: 1,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1 - 0.5,
        life: 0,
        maxLife: 25 + Math.random() * 15,
        hue: Math.random() > 0.6 ? 39 : 220,
      });
    };
    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparklesRef.current = sparklesRef.current.filter((s) => s.life < s.maxLife);
      sparklesRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.015;
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;

        ctx.save();
        ctx.globalAlpha = s.opacity * 0.7;
        ctx.fillStyle =
          s.hue === 39
            ? `hsla(39, 55%, 65%, ${s.opacity})`
            : `hsla(220, 35%, 65%, ${s.opacity})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
  );
};

export default SparklesCursor;
