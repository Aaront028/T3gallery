"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  message: string;
  footer: React.ReactNode;
  onClose: () => void;
}

export function Modal({ title, message, footer, onClose }: ModalProps) {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function closeModal() {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    onClose();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-black/50 text-white flex items-center justify-center"
      onClose={closeModal}
    >
      <div
        className="relative bg-white text-black p-6 rounded-md shadow-lg"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black p-2 rounded bg-gray-200 transition-opacity duration-300"
        >
          X
        </button>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-center gap-4">
            {footer}
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
