import { type NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '~/server/queries'; // Ensure this path is correct

interface DeleteImageRequestBody {
  id: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as DeleteImageRequestBody;

    if (typeof body.id !== 'number') {
      return NextResponse.json({ message: 'ID must be a number' }, { status: 400 });
    }

    await deleteImage(body.id);
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: `Failed to delete image: ${(error as Error).message}` }, { status: 500 });
  }
}
