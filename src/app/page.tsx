import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/eeb457f6-3525-445c-b974-cdec580d4412-aipppd.jpg",
  "https://utfs.io/f/b91591ce-95e9-47a8-90a8-0460ec3c884f-t2dsij.jpg",
  "https://utfs.io/f/5b0d129f-93a0-43b6-812d-abf1cf83c7c6-wdf4qc.jpg",
  "https://utfs.io/f/f9f7b187-6f5d-4b28-9885-4f36514c3525-cxxv9t.jpg"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));


export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={`Image ${image.id}`} className="w-48 h-48 object-cover" />
          </div>

        ))}

      </div>
      Hello (Gallery in progress)
    </main>
  );
}
