'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Navigation Progress Provider Component (Client Component)
 * 
 * Provides a progress bar that shows when navigating between routes.
 * Stays visible until the page is fully loaded.
 */
export default function NavigationProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    // Track link clicks globally
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        // Skip external links, mailto, tel, and hash links
        if (
          link.href.startsWith('mailto:') ||
          link.href.startsWith('tel:') ||
          link.href.includes('#') ||
          link.target === '_blank'
        ) {
          return;
        }

        try {
          const url = new URL(link.href);
          const currentUrl = new URL(window.location.href);
          
          // Only show progress for internal navigation
          if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
            setIsLoading(true);
            setProgress(10);
            
            // Gradually increase progress
            const timer1 = setTimeout(() => setProgress(30), 100);
            const timer2 = setTimeout(() => setProgress(50), 300);
            const timer3 = setTimeout(() => setProgress(70), 500);
            const timer4 = setTimeout(() => setProgress(85), 800);
            
            return () => {
              clearTimeout(timer1);
              clearTimeout(timer2);
              clearTimeout(timer3);
              clearTimeout(timer4);
            };
          }
        } catch (error) {
          // Invalid URL, skip
        }
      }
    };

    // Listen for link clicks
    document.addEventListener('click', handleLinkClick, true);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  useEffect(() => {
    // When pathname changes, wait for page to fully load
    if (pathname !== currentPath) {
      setCurrentPath(pathname);
      
      if (isLoading) {
        // Wait for page to be fully loaded
        const checkPageLoad = () => {
          // Check if page is loaded
          if (document.readyState === 'complete') {
            // Wait a bit more for images and content to render
            const images = document.querySelectorAll('img');
            let loadedImages = 0;
            const totalImages = images.length;

            if (totalImages === 0) {
              // No images, complete immediately
              setProgress(100);
              setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
              }, 300);
              return;
            }

            // Wait for images to load
            const imageLoadHandler = () => {
              loadedImages++;
              if (loadedImages === totalImages) {
                setProgress(100);
                setTimeout(() => {
                  setIsLoading(false);
                  setProgress(0);
                }, 300);
              }
            };

            images.forEach((img) => {
              if (img.complete) {
                loadedImages++;
              } else {
                img.addEventListener('load', imageLoadHandler);
                img.addEventListener('error', imageLoadHandler);
              }
            });

            // If all images are already loaded
            if (loadedImages === totalImages) {
              setProgress(100);
              setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
              }, 300);
            } else {
              // Set a timeout in case some images don't load
              setTimeout(() => {
                setProgress(100);
                setTimeout(() => {
                  setIsLoading(false);
                  setProgress(0);
                }, 300);
              }, 2000);
            }
          } else {
            // Page not ready yet, wait for load event
            window.addEventListener('load', checkPageLoad, { once: true });
            
            // Fallback timeout
            setTimeout(() => {
              setProgress(100);
              setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
              }, 300);
            }, 3000);
          }
        };

        // Small delay to ensure DOM is updated
        setTimeout(checkPageLoad, 100);
      }
    }
  }, [pathname, currentPath, isLoading]);

  // Initial page load
  useEffect(() => {
    const handleInitialLoad = () => {
      if (document.readyState === 'complete') {
        setIsLoading(false);
        setProgress(0);
      }
    };

    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      window.addEventListener('load', handleInitialLoad, { once: true });
    }
  }, []);

  return (
    <>
      {/* Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#009FE8] to-[#00d4ff] transition-all duration-300 ease-out shadow-lg"
            style={{
              width: `${progress}%`,
              transition: 'width 0.2s ease-out',
            }}
          />
        </div>
      )}
      {children}
    </>
  );
}
