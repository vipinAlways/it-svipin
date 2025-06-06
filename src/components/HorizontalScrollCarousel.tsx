'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const sections = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

export default function HorizontalSnapScroll() {
   const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

  // Handle wheel scroll, move one slide at a time
const onWheel = (e: WheelEvent) => {
  e.preventDefault(); // always block vertical scroll inside container

  if (isScrolling.current) return;

  if (e.deltaY > 30 && activeIndex < sections.length - 1) {
    setActiveIndex(i => i + 1);
    isScrolling.current = true;
  } else if (e.deltaY < -30 && activeIndex > 0) {
    setActiveIndex(i => i - 1);
    isScrolling.current = true;
  }

  setTimeout(() => {
    isScrolling.current = false;
  }, 700);
};


 useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [activeIndex]);


  return (
    <div style={{ overflow: 'hidden', height: '100vh' }} ref={containerRef} className='sticky top-0 h-[500vh] w-full'>
      <motion.div
        style={{ display: 'flex', height: '100vh' }}
        animate={{ x: `-${activeIndex * 100}vw` }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {sections.map((slide, i) => (
          <div
            key={i}
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: `hsl(${i * 90}, 70%, 60%)`,
              fontSize: '3rem',
              userSelect: 'none',
            }}
          >
            {slide}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
