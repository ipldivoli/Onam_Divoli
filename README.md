# Divoli — Onam

## Run it locally

    npm install
    npm run dev

Then open the URL Vite prints (usually http://localhost:5173).

## Gallery images (Vercel Blob)

Gallery photos are NOT bundled with the code — they're stored in Vercel
Blob and loaded dynamically by `api/gallery.js`. To add or change photos,
you upload a file; no code change or redeploy needed.

### One-time setup

1. In your Vercel project dashboard: **Storage → Create → Blob**, create
   a store, and connect it to this project. This automatically adds a
   `BLOB_READ_WRITE_TOKEN` environment variable to your project.
2. Locally, run `vercel link` once to connect this folder to the project
   (needed for the CLI upload commands below).

### Uploading photos

    vercel blob put ./my-photo.jpg --pathname gallery/pookalam.jpg --access public

Repeat for each photo. The `gallery/` prefix is what `api/gallery.js`
looks for — keep every gallery image under that prefix. The filename
before the extension becomes the caption shown on hover (e.g.
`gallery/vallam-kali.jpg` → "vallam kali"), so name files accordingly.

To see what's currently uploaded:

    vercel blob list --prefix gallery/

### Local development note

`api/gallery.js` is a Vercel serverless function. Plain `npm run dev`
(Vite) does NOT run it — you'll see failed fetches to `/api/gallery` in
local dev unless you run `vercel dev` instead, which emulates Vercel's
full platform (frontend + functions) locally. `npm run dev` is still
fine for iterating on styling/layout that doesn't depend on the gallery
data.

## Background video

Unrelated to Blob — still served from `public/assets/onam-video.mp4`
(see public/assets/gallery/README.txt is no longer used; that folder
can be deleted).


## Build for production

    npm run build

Output goes to `dist/`. Deploy that folder to any static host
(Vercel, Netlify, S3 + CloudFront, GitHub Pages, etc).

## Structure

    src/App.jsx     — the whole landing page (hero + nav)
    index.html      — page shell, loads Google Fonts (Cormorant Garamond, Jost)
    public/assets/  — put your video here
