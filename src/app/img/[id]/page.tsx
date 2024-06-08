export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <div>{photoId} In the actual route when refreshed</div>;
}