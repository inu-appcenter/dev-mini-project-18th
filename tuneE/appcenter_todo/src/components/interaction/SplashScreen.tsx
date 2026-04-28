'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import { useSplashStore } from '@/store/useTodoStore';

interface SplashScreenProps {
  children: ReactNode;
}
const SplashScreen = ({ children }: SplashScreenProps) => {
  const { hasShownSplash, setHasShownSplash } = useSplashStore();
  const [isLoading, setIsLoading] = useState(!hasShownSplash);

  useEffect(() => {
    if (hasShownSplash) return; // 이미 스플래시를 본 경우 로딩 상태로 진입하지 않음

    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasShownSplash(); // 스플래시를 봤다고 상태 업데이트
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-100 mx-auto max-w-103 overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="splash"
              // 화면을 다 가리는 크기의 원
              initial={{ clipPath: 'circle(150% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
              // 좌상단(0% 0%) 위치로 작아지며 사라짐
              exit={{ clipPath: 'circle(0% at 0% 0%)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="bg-brand-color pointer-events-auto flex h-full w-full flex-col items-center justify-center gap-1"
            >
              <motion.img
                src="/icons/app-center-todo-icon-512.png"
                alt="appcenter-todo-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="h-24 w-24"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-bg-primary"
              >
                Appcenter Todo
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </>
  );
};
export default SplashScreen;
