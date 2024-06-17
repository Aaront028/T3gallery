// pages/api/delete-image.ts
import { type NextApiRequest, type NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';
import { deleteImage } from '~/server/queries'; // Ensure this path is correct

interface DeleteImageRequest extends NextApiRequest {
  body: {
    id: number;
  };
}

export default async function handler(req: DeleteImageRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  if (typeof id !== 'number') {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  try {
    console.log("This is the id in the try section", id)
    await deleteImage(id);

    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Failed to delete image: ${(error as Error).message}` });
  }
}
