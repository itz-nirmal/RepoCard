import React, { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

const AnimatedBackground: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const elementCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 20000
      );
      const newElements: FloatingElement[] = [];

      for (let i = 0; i < elementCount; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          animationDuration: Math.random() * 10 + 10,
          animationDelay: Math.random() * 5,
        });
      }

      setElements(newElements);
    };

    generateElements();

    const handleResize = () => {
      generateElements();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Base gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      />

      {/* Animated floating elements */}
      <div className="absolute inset-0">
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              backgroundColor: `rgba(99, 102, 241, ${element.opacity})`,
              transform: "translate(-50%, -50%)",
              animation: `float ${element.animationDuration}s linear infinite`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%)",
            left: "20%",
            top: "30%",
            animation: "drift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-15 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
            right: "20%",
            bottom: "30%",
            animation: "drift 15s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Inline styles for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
            }
            25% {
              transform: translate(-50%, -50%) translateY(-10px) rotate(90deg);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-5px) rotate(180deg);
            }
            75% {
              transform: translate(-50%, -50%) translateY(-15px) rotate(270deg);
            }
          }
          
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
