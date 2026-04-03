# Landsbyggðin lifi — website

Website for [Landsbyggðin lifi](https://landlif.is), an Icelandic rural community organisation. Built with Next.js 16 and Sanity CMS.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **Sanity** — headless CMS for all content
- **Tailwind CSS** — styling
- **TypeScript**

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token
```

Find your project ID and create a token at [manage.sanity.io](https://manage.sanity.io). The token needs write access if you use any of the seed/migration scripts.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Project structure

```
src/
  app/           # Next.js App Router pages
    samtokin/    # Samtökin section (4 pages)
    starfid/     # Starfið section (12 pages)
    frettir/     # News listing + [slug] detail
    um-okkur/    # About page
    hafa-samband/# Contact page
    studio/      # Sanity Studio
  components/    # Shared UI components
  sanity/        # Sanity client, queries, schemas, image helper
scripts/         # One-off migration and seed scripts
public/          # Static assets (logo, etc.)
```

## Content management

All page content is managed through Sanity Studio. Pages are fetched by fixed document IDs (e.g. `page-markmid`). News posts are fetched by slug.

If a page's Sanity document hasn't been created yet, the page falls back to hardcoded placeholder content until it's populated in the CMS.
