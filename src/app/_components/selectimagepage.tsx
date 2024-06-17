'use client'; // Ensure this is at the top

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useImageStore } from '../utils/store';
import { clerkClient, currentUser } from "@clerk/nextjs/server";

interface ImageData {
  id: number;
  url: string;
  name: string;
}

interface SelectImagePageProps {
  image: ImageData;
}

const SelectImagePage: React.FC<SelectImagePageProps> = ({ image }) => {
  const { selectedImages, selectImage, deselectImage } = useImageStore();
  const [isHovered, setIsHovered] = useState(false);


  const toggleSelectImage = (id: number) => {
    if (selectedImages.has(id)) {
      deselectImage(id);
    } else {
      selectImage(id);
    }
  };

  const isSelected = selectedImages.has(image.id);

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/img/${image.id}`}>
        <div className="relative w-48 h-48 overflow-hidden rounded-lg">
          <Image
            src={image.url}
            width={192}
            height={192}
            layout="responsive"
            objectFit="contain"
            alt={image.name}
          />
        </div>
      </Link>
      <button
        className={`mt-2 px-4 py-2 rounded-md text-white transition-colors duration-300 ${isSelected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={() => toggleSelectImage(image.id)}
        style={{
          visibility: isHovered || isSelected ? 'visible' : 'hidden',
          opacity: isHovered || isSelected ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {isSelected ? 'Deselect Image' : 'Select Image'}
      </button>
    </div>
  );
};

export default SelectImagePage;
