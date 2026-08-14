# Colin Crowther — Developer Portfolio

![Cloudflare Workers](https://img.shields.io/badge/Deployed-Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

> Personal portfolio website showcasing projects, skills, and professional experience.

---

## Overview

Source code for [craw.ca](https://craw.ca) — my personal portfolio and project hub. The Next.js frontend is exported at build time and served through Cloudflare Workers Static Assets. A small native Worker handles the contact endpoint.

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) |
| 3D / Animation | [Three.js](https://threejs.org/) / [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) |
| Hosting | [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) |
| Email | [Resend API](https://resend.com/) via Cloudflare Worker |
| Icons | [Lucide React](https://lucide.dev/) |

## Project Structure

```
app/                  # Statically exported Next.js App Router pages
components/           # React components (sections, UI, backgrounds)
  ui/                 # Reusable low-level UI primitives
hooks/                # Custom React hooks
lib/                  # Shared utilities and project data
public/               # Static assets, fonts, and web manifest
worker/               # Cloudflare Worker API handler
wrangler.jsonc        # Workers, assets, rate limits, and runtime config
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Export the production site to `out/` |
| `npm run check` | Run TypeScript validation |
| `npm run preview` | Build and preview with the Workers runtime |
| `npm run deploy` | Build and deploy the Worker and static assets |
| `npm run types:cloudflare` | Regenerate Cloudflare binding types |

## License

**Copyright © 2026 Colin Crowther.**

All rights reserved. This software is proprietary and confidential. Unauthorized copying, distribution, or use of this code is strictly prohibited.
