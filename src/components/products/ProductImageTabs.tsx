'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageTabsProps {
  productImage3D?: string;
  imageAlt: string;
  applicationImages?: Record<string, string>;
  applications?: string[];
}

/**
 * Product Image Tabs Component (Client Component)
 * 
 * Handles interactive image switching when clicking application tabs.
 */
export default function ProductImageTabs({
  productImage3D,
  imageAlt,
  applicationImages,
  applications,
}: ProductImageTabsProps) {
  const [selectedApplication, setSelectedApplication] = useState<string>(
    applications && applications.length > 0 ? applications[0] : ''
  );

  // Get the image for the selected application, or fallback to default
  const getCurrentImage = () => {
    if (applicationImages && selectedApplication && applicationImages[selectedApplication]) {
      return applicationImages[selectedApplication];
    }
    return productImage3D || '/product_image_1.jpg';
  };

  return (
    <div className="flex flex-col items-center lg:items-start bg-white rounded-[50px] p-8">
      {/* 3D Product Image */}
      <div className="relative w-full max-w-md aspect-[3/4] mb-8 mx-auto">
        <Image
          src={getCurrentImage()}
          alt={imageAlt}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Applications - Tabs */}
      {applications && applications.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center w-full pt-6">
          {applications.map((app) => (
            <button
              key={app}
              onClick={() => setSelectedApplication(app)}
              className={`px-4 py-2 cursor-pointer text-sm md:text-base font-medium transition-colors ${
                selectedApplication === app
                  ? 'text-[#009FE8]'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
