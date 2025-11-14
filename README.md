# Portfolio — Jordan Dexter

A personal portfolio website built with Next.js and TypeScript. This repository contains the source for a responsive, component-driven portfolio showcasing projects, design work, and contact information.

## About

This site is a modern portfolio built on Next.js (App Router) with React and Tailwind CSS styles. It uses a component-first approach — individual previews, sliders, and modals are organized under `components/` and `app/` contains the pages and layout.

Key goals:
- Fast, accessible pages with animations (framer-motion)
- Reusable components for project previews and statistics
- Easy content updates by adding project folders under `public/` and wiring them in `app/project` pages

## Built with

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS and PostCSS
- Framer Motion for animations

## Getting started

Prerequisites:

- Node.js 18 or newer
- npm

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Production build:

```bash
npm run build
npm start
```

Linting:

```bash
npm run lint
```

Those scripts are taken from `package.json` and map to the standard Next.js commands.

## Project structure (important files/folders)

- `app/` — Next.js App Router pages and layout (`page.tsx`, `layout.tsx`, global CSS)
	- `project/` — project listing and dynamic project pages (`[name]/page.tsx`)
- `components/` — reusable UI pieces (Previews, Header, ContactForm, etc.)
- `modals/` — modal components (e.g., `ProjectModal.tsx`)
- `public/` — static assets and project media
- `package.json` — scripts and dependencies
- `tsconfig.json`, `next.config.ts` — configuration

Notable component folders:
- `components/ProjectPreview/` — project preview cards and types
- `components/ContactForm/` — contact form implementation and types
- `components/StatisticsPreview/`, `TechnologiesPreview/` — small preview widgets used across pages

## How to add a new project

1. Add project images and assets to `public/<your-project>/`.
2. Add a new folder under `app/project/<your-slug>/` with a `page.tsx` that reads the media and metadata you want to show. The existing dynamic route `app/project/[name]/page.tsx` is a reference for how project pages are structured.
3. Update any project data source you may be using (if the project list is derived from a constants file in `components/ProjectPreview/constants.ts`, update it there).

## Contributing

This repository is structured for a single maintainer, but contributions are welcome:

- Open an issue for changes or bugs.
- Fork the repo and make a feature branch.
- Send a PR with a clear description of the change.

Style notes:
- Follow existing TypeScript and React patterns in `components/`.
- Keep components small and focused (one responsibility).