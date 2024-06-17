'use client'; // Ensure this is at the top

import React, { useState } from 'react';
import { useImageStore } from '../../utils/store';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { SimpleUploadButton } from '../simple-upload-button';
import { useRouter } from 'next/navigation';
import { Modal } from './modal';
import { toast } from 'sonner';

export function TopNav() {
  const { selectedImages, deleteSelectedImages, clearSelection } = useImageStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', footer: null as React.ReactNode });

  function LoadingSpinnerSVG() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" /></svg >
    )
  }

  const handleDeselectButton = () => {
    clearSelection();
  }

  const handleDeleteSelected = () => {
    if (selectedImages.size === 0) {
      setModalContent({
        title: 'No Images Selected',
        message: 'Please select images to delete.',
        footer: (
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onClick={() => setIsModalOpen(false)}>
            OK
          </button>
        ),
      });
      setIsModalOpen(true);
      return;
    }

    setModalContent({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${selectedImages.size} selected image(s)?`,
      footer: (
        <>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2" onClick={confirmDeleteSelected}>
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </>
      ),
    });
    setIsModalOpen(true);
  };

  const confirmDeleteSelected = async () => {
    const selectedImageIds = Array.from(selectedImages);

    toast.loading(
      <div className="flex gap-2 text-white items-center">
        <LoadingSpinnerSVG /><span className="text-lg">Deleting...</span>
      </div>,
      {
        duration: 100000, // Long duration to show during the deletion process
        id: "delete-process",
      }
    );

    try {
      await deleteSelectedImages(selectedImageIds);
      toast.success('Selected images deleted successfully');
      clearSelection();
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete selected images:', error);
      const errorMessage = ((error as Error).message) || 'Failed to delete selected images';
      setModalContent({
        title: 'Error',
        message: errorMessage,
        footer: (
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onClick={() => setIsModalOpen(false)}>
            OK
          </button>
        ),
      });
      setIsModalOpen(true);
    } finally {
      toast.dismiss("delete-process");
    }
  };

  return (
    <>
      <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
        <div>Gallery</div>
        <div className="flex flex-row gap-4 items-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          {(selectedImages.size !== 0) && <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>}
          {(selectedImages.size !== 0) && <button
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
            onClick={handleDeselectButton}
          >
            Deselected All
          </button>}
          <SignedIn>
            <SimpleUploadButton />
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {isModalOpen && (
        <Modal title={modalContent.title} message={modalContent.message} footer={modalContent.footer} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
