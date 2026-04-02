/**
 * Ambient module declarations for side-effect imports (CSS, Swiper) so TypeScript
 * does not report TS2882 when `moduleResolution` cannot resolve non-TS assets.
 */
declare module '*.css';

declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
