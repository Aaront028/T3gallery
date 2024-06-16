import { create } from 'zustand'

// Define the type for the counter store
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create the counter store
export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Define the type for the image store
interface ImageStore {
  selectedImages: Set<number>;
  selectImage: (id: number) => void;
  deselectImage: (id: number) => void;
  clearSelection: () => void;
}

// Create the image store
export const useImageStore = create<ImageStore>((set) => ({
  selectedImages: new Set(),
  selectImage: (id: number) => set((state) => {
    const updatedSelection = new Set(state.selectedImages);
    updatedSelection.add(id);
    return { selectedImages: updatedSelection };
  }),
  deselectImage: (id: number) => set((state) => {
    const updatedSelection = new Set(state.selectedImages);
    updatedSelection.delete(id);
    return { selectedImages: updatedSelection };
  }),
  clearSelection: () => set({ selectedImages: new Set() }),
}));
