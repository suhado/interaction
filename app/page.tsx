'use client';
import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

const AnimatedText = ({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(progress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.div
      className='flex h-screen items-center justify-center'
      style={{ opacity, y }}
    >
      <h2 className='text-3xl font-semibold'>{text}</h2>
    </motion.div>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rightTexts = [
    '첫 번째 텍스트',
    '두 번째 텍스트',
    '세 번째 텍스트',
    '네 번째 텍스트',
  ];

  const textProgresses = rightTexts.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(
      scrollYProgress,
      [index / rightTexts.length, (index + 1) / rightTexts.length],
      [0, 1]
    )
  );

  return (
    <div ref={containerRef} className='relative min-h-screen'>
      <div className='fixed left-0 top-1/2 w-1/2 -translate-y-1/2 transform p-8'>
        <h1 className='text-4xl font-bold'>SYNC YOUR</h1>
      </div>
      <div className='flex'>
        <div className='fixed left-[220px] top-1/2 w-1/2 -translate-y-1/2 transform p-8'>
          [
        </div>
        <div className='w-1/2'>
          {rightTexts.map((text, index) => (
            <AnimatedText
              key={index}
              text={text}
              progress={textProgresses[index]}
            />
          ))}
        </div>
        <div className='fixed left-[450px] top-1/2 w-1/2 -translate-y-1/2 transform p-8'>
          ]
        </div>
      </div>
    </div>
  );
};

export default Home;
