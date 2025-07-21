import React, { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      
      canvas.width = width;
      canvas.height = height;
      
      // Initialize dots
      const dotCount = Math.floor((width * height) / 15000);
      dotsRef.current = [];
      
      for (let i = 0; i < dotCount; i++) {
        dotsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const drawDot = (dot: Dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${dot.opacity})`;
      ctx.fill();
    };

    const drawConnection = (dot1: Dot, dot2: Dot, distance: number, maxDistance: number) => {
      const opacity = (1 - distance / maxDistance) * 0.3;
      ctx.beginPath();
      ctx.moveTo(dot1.x, dot1.y);
      ctx.lineTo(dot2.x, dot2.y);
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawMouseConnection = (dot: Dot, mouseX: number, mouseY: number, distance: number, maxDistance: number) => {
      const opacity = (1 - distance / maxDistance) * 0.6;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0c0c0c");
      gradient.addColorStop(0.5, "#1a1a2e");
      gradient.addColorStop(1, "#16213e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;
      const maxConnectionDistance = 120;
      const maxMouseDistance = 150;

      // Update dot positions
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

        // Keep dots within bounds
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));

        // Mouse interaction - attract dots to mouse
        const mouseDistance = Math.sqrt(
          Math.pow(dot.x - mouseRef.current.x, 2) + 
          Math.pow(dot.y - mouseRef.current.y, 2)
        );
        
        if (mouseDistance < maxMouseDistance) {
          const force = (maxMouseDistance - mouseDistance) / maxMouseDistance * 0.02;
          const angle = Math.atan2(mouseRef.current.y - dot.y, mouseRef.current.x - dot.x);
          dot.vx += Math.cos(angle) * force;
          dot.vy += Math.sin(angle) * force;
          
          // Limit velocity
          const maxVelocity = 2;
          const velocity = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
          if (velocity > maxVelocity) {
            dot.vx = (dot.vx / velocity) * maxVelocity;
            dot.vy = (dot.vy / velocity) * maxVelocity;
          }
        }
      });

      // Draw connections between dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const distance = Math.sqrt(
            Math.pow(dots[i].x - dots[j].x, 2) + 
            Math.pow(dots[i].y - dots[j].y, 2)
          );
          
          if (distance < maxConnectionDistance) {
            drawConnection(dots[i], dots[j], distance, maxConnectionDistance);
          }
        }
      }

      // Draw connections to mouse
      dots.forEach((dot) => {
        const mouseDistance = Math.sqrt(
          Math.pow(dot.x - mouseRef.current.x, 2) + 
          Math.pow(dot.y - mouseRef.current.y, 2)
        );
        
        if (mouseDistance < maxMouseDistance) {
          drawMouseConnection(dot, mouseRef.current.x, mouseRef.current.y, mouseDistance, maxMouseDistance);
        }
      });

      // Draw dots
      dots.forEach(drawDot);

      // Draw mouse cursor effect
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: dimensions.width, height: dimensions.height }}
      />
      
      {/* Additional gradient orbs for depth */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
            left: "20%",
            top: "30%",
            animation: "drift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
            right: "20%",
            bottom: "30%",
            animation: "drift 15s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Animation styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes drift {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;