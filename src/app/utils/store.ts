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
  // deleteSelectedImages: async () => {
  //   console.log("deleteSelectedImages called");
  //   const selectedImageIds = Array.from(get().selectedImages);
  //   console.log("selectedImageIds:",selectedImageIds);
  //   for (const id of selectedImageIds) {
  //     try {
  //       console.log("id:",id);
  //       const response = await fetch('/api/delete-image', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ id }),
  //       });
  //       console.log("response:",response);

  //       if (!response.ok) {
  //         const errorData = await response.json() as ErrorResponse;
  //         throw new Error(errorData?.message || 'Failed to delete image');
  //       }

  //       set((state) => {
  //         const updatedSelection = new Set(state.selectedImages);
  //         updatedSelection.delete(id);
  //         return { selectedImages: updatedSelection };
  //       });
  //     } catch (error) {
  //       console.error(`Failed to delete image with ID ${id}:`, error);
  //     }

  //   }
  // },
  // Client-side code using fetch to send POST request
// deleteSelectedImages: async (ids: number[]) => {
//   for (const id of ids) {
//     try {
//       const response = await fetch('/api/delete-image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (!response.ok) {
//                 const errorData = await response.json() as ErrorResponse;
//                 throw new Error(errorData?.message || 'Failed to delete image');
//               }

//       // Optionally handle success response if needed

//     } catch (error) {
//       console.error(`Failed to delete image with ID ${id}:`, error);
//       throw error; // Propagate the error back if necessary
//     }
//   }
// },

// Client-side code using fetch to send POST request
// Client-side code using fetch to send POST request
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
          console.log("response!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:",response)
          // Return response object to Promise.all
          // return response;
          revalidatePath('/');

          // Redirect to homepage after successful deletion


        } catch (error) {
          // console.error('Failed to delete image:', error);
          // Handle and display error to the user
        }
      })
    );

    // Update local state to reflect deletions immediately
    set((state) => ({
      selectedImages: new Set([...state.selectedImages].filter((imageId) => !ids.includes(imageId))),
    }));

    // Revalidate the cache after successful deletions
    // revalidatePath('/');

},



}));
