'use client'; // Ensure this is at the top

import React from 'react';
import { useImageStore } from '../utils/store';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SimpleUploadButton } from './simple-upload-button';
import { revalidatePath } from 'next/cache';
import { redirect, useRouter } from 'next/navigation';

export function TopNav() {
  const { selectedImages, deleteSelectedImages, clearSelection } = useImageStore();
  const router = useRouter();

  const handleDeleteSelected = async () => {
    console.log('selectedImages:', selectedImages);

    if (selectedImages.size === 0) {
      alert('No images selected');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedImages.size} selected image(s)?`)) {
      const selectedImageIds = Array.from(selectedImages);

      try {
        await deleteSelectedImages(selectedImageIds);
        // Clear selection after successful deletion
        clearSelection(); // Assuming this function clears selectedImages in your store
        alert('Selected images deleted successfully');
        router.refresh();
      } catch (error) {
        console.error('Failed to delete selected images:', error);

        // Handle specific error cases based on error message or type
        if (error instanceof TypeError) {
          alert('Network error: Unable to communicate with the server.');
        } else if (error instanceof Error) {
          // Assuming the server returned an error response
          const errorMessage = error.message || 'Failed to delete selected images';
          alert(errorMessage);
        } else {
          // Catch-all for any other unexpected errors
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    }
  };


  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div className="flex flex-row gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
      {/* <div className="flex flex-row gap-4 items-center">

      </div> */}
    </nav>
  );
}
