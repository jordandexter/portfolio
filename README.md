
If you are a hiring manager, this repo is indended to be not only an archive my my professional experience but also a demonstration of my technical expertise. Throughout its creation, I followed industry best practices to make a beautiful, maintainable, industry standard web application in my own style.

If you are simply browsing, thanks for taking a look! Hope that this repo teaches you something.

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
