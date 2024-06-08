import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";


export const dynamic = "force-dynamic"

async function Images() {

  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt={`Image ${image.id}`} className="w-48 h-48 object-cover" />
        </div>

      ))}

    </div>)
}

export default async function HomePage() {

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>

      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
