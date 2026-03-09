# Premium Developer Portfolio

A high-end, vibrant dark-theme developer portfolio built with Next.js App Router, Tailwind CSS v4, Framer Motion, and React Three Fiber. Designed to look modern, visually striking, and technically impressive for top-tier recruiters.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js & React Three Fiber
- **Animations**: Framer Motion
- **Components**: React Circular Progressbar, React Icons
- **Fonts**: Space Grotesk, Inter

## Features
- **3D Hero Animation**: A custom interactive neon grid wave with floating code particles built using React Three Fiber.
- **Glowing Cursor Effect**: A global blurred gradient that smoothly follows mouse movements.
- **Premium Dark Aesthetic**: A deep `#020617` background with vibrant indigo, cyan, and green glowing shadow effects.
- **Interactive UI**: Framer Motion scroll-reveals, hover-lifts on project cards, and animated terminal UI.
- **Modular Data**: Update your projects and skills effortlessly via `src/data/projects.ts` and `src/data/skills.ts`.

## Running Locally

1. Install dependencies (including 3D libraries):
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to experience the 3D portfolio.

## Structure
- `src/components/`: Contains all modular sections (Hero, About, TechSkills, FeaturedProjects) and global effects (CursorGlow).
- `src/data/`: Houses the configurable data sources for projects and skills.
- `src/app/`: The Next.js App Router configuration and global layouts.

## Deploy on Vercel
The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Sign in to Vercel and click "Add New... > Project".
3. Import your GitHub repository.
4. Leave the default settings (Framework Preset: Next.js).
5. Click **Deploy**.

Vercel will automatically build and deploy your site, providing you with a live URL in seconds.
