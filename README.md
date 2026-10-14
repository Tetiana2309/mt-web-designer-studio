# M&T Web Designer Studio

Multi-page portfolio website for a web design agency. This repository currently contains only the
technical foundation (build tooling and dependencies). Pages, components and visual design are not
implemented yet.

## Technology stack

- React 19, TypeScript (strict mode), Vite
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- React Router
- GSAP (including ScrollTrigger)
- Three.js, React Three Fiber, Drei
- Lenis
- ESLint (flat config, typescript-eslint, react-hooks) and Prettier

## Installation

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
```

## Development commands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Start the Vite dev server      |
| `npm run typecheck`    | Type-check with `tsc -b`       |
| `npm run lint`         | Run ESLint                     |
| `npm run format`       | Format files with Prettier     |
| `npm run format:check` | Check formatting with Prettier |

## Production build

```bash
npm run build     # type-check and build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
.
├── public/images/    # Optimized WebP images (protected, do not modify)
├── src/
│   ├── assets/icons/ # SVG icons used by the Hero
│   ├── components/   # Hero.tsx (static Hero section)
│   ├── App.tsx
│   ├── index.css     # Tailwind CSS entry and colour/font tokens from Figma
│   └── main.tsx      # React entry point
├── index.html
├── vite.config.ts
├── eslint.config.js
└── tsconfig*.json
```

## Notes on future design implementation

Page structure, routes, design tokens, typography, animations (GSAP, Lenis) and 3D scenes
(React Three Fiber) will be implemented in later phases, based on the approved design.
