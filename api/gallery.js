import { list } from '@vercel/blob';

// Serverless function — Vercel auto-detects anything under /api
// as a function regardless of frontend framework (Vite, CRA, etc).
// Returns the current contents of the "gallery/" folder in Blob storage.

export default async function handler(req, res) {
  try {
    const { blobs } = await list({ prefix: 'gallery/' });

    const images = blobs
      .filter((blob) => !blob.pathname.endsWith('/'))
      .map((blob) => ({
        src: blob.url,
        alt: blob.pathname
          .replace('gallery/', '')
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' '),
      }));

    res.status(200).json({ images });
  } catch (error) {
    console.error('Failed to list gallery blobs:', error);
    res.status(500).json({ images: [], error: 'Failed to load gallery images' });
  }
}
