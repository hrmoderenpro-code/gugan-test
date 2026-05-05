'use client';
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const heroRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const currentFrame = (index: number) =>
      `/sequence/Gugan Webp/frame_${index.toString().padStart(3, '0')}_delay-0.033s.png`;

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current[i] = img;
      }
    };

    const render = () => {
      const img = imagesRef.current[heroRef.current.frame];
      if (!img || !canvas || !context) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
      const heroHeight = heroSection.offsetHeight - window.innerHeight;
      const heroScrollFraction = Math.min(Math.max(scrollTop / heroHeight, 0), 1);
      
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(heroScrollFraction * frameCount)
      );

      if (heroRef.current.frame !== frameIndex) {
        heroRef.current.frame = frameIndex;
        requestAnimationFrame(render);
      }
    };

    loadImages();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', render);
    
    // Initial render
    setTimeout(render, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', render);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" />;
}
