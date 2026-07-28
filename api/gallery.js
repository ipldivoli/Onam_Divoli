import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const { blobs } = await list();

    const images = blobs.map((blob) => ({
      src: blob.url,
      alt: blob.pathname
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " "),
    }));

    return res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      images: [],
      error: error.message,
    });
  }
}