// Adjusted Zustand store with proper error handling and TypeScript support
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {create} from 'zustand';

// Define interface for error response
interface ErrorResponse {
  message: string;
}

interface ImageStore {
  selectedImages: Set<number>;
  selectImage: (id: number) => void;
  deselectImage: (id: number) => void;
  clearSelection: () => void;
  // deleteSelectedImages: () => Promise<void>;
  deleteSelectedImages: (ids: number[]) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  selectedImages: new Set(),
  selectImage: (id: number) =>
    set((state) => ({
      selectedImages: new Set([...state.selectedImages, id]),
    })),
  deselectImage: (id: number) =>
    set((state) => ({
      selectedImages: new Set([...state.selectedImages].filter((imageId) => imageId !== id)),
    })),
  clearSelection: () => set({ selectedImages: new Set() }),

  deleteSelectedImages: async (ids: number[]) => {

      // Perform deletion requests in parallel
      const responses = await Promise.all(
        ids.map(async (id) => {
          try {
            const response = await fetch('/api/delete-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });

            if (!response.ok) {
              // If deletion request fails, throw an error
              const errorData = await response.json() as ErrorResponse;
              throw new Error(errorData?.message || 'Failed to delete image');
            }
            revalidatePath('/');

          } catch (error) {
            console.error('Failed to delete image:', error);
            // Handle and display error to the user
          }
        })
      );

      // Update local state to reflect deletions immediately
      set((state) => ({
        selectedImages: new Set([...state.selectedImages].filter((imageId) => !ids.includes(imageId))),
      }));

  },



}));
