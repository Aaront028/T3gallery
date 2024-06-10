import { SignedIn, SignedOut } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic"

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map(async (image) => {
        const uploaderInfo = await clerkClient.users.getUser(image.userId);
        return (
          <div key={image.id} className="flex w-48 flex-col justify-center">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                alt={image.name}
              />
            </Link>
            {/* <div>Uploader ID: {image.userId}</div>
            <div>Uploader Name: {uploaderInfo.fullName}</div> */}
          </div>
        );
      })}
    </div>
  );
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
