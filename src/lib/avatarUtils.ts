export const getAvatarUrl = (
  imageUrl?: string | null,
  updatedAt?: string | Date | null,
) => {
  if (!imageUrl) return '';

  try {
    const version = updatedAt
      ? new Date(updatedAt).getTime().toString()
      : Date.now().toString();
    const url = new URL(imageUrl);
    url.searchParams.set('v', version);
    return url.toString();
  } catch {
    const version = updatedAt
      ? new Date(updatedAt).getTime().toString()
      : Date.now().toString();
    return imageUrl.includes('?')
      ? `${imageUrl}&v=${version}`
      : `${imageUrl}?v=${version}`;
  }
};
