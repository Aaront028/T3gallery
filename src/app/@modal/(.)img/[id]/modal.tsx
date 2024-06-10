"use client";

import { type ElementRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(

    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-black/90 text-white"
      onClose={onDismiss}
    >
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-white p-2 rounded bg-black/50 transition-opacity duration-300"
        >
          X
        </button>
      </div>
      {children}
    </dialog>,

    document.getElementById("modal-root")!,
  );
}