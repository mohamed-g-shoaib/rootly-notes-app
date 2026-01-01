<p align="center">
  <img alt="Rootly Notes - Your learning journey tracker" src="app/opengraph-image.png" width="1200" />
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img alt="Shadcn UI" src="https://img.shields.io/badge/Shadcn%20UI-161618?style=for-the-badge&logo=shadcnui&logoColor=white" />
</p>

<p align="center">
  <a href="https://rootly-notes-app.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live%20Demo-View%20Rootly-389bbe?style=for-the-badge" alt="Live Demo">
  </a>
</p>

---

## Overview

Rootly Notes is a privacy-first learning management application for tracking courses, capturing Q&A notes, logging daily study sessions, and visualizing progress. Built with an offline-first architecture, it works with localStorage by default and offers optional cloud sync via Supabase.

Open sourced under [Devloop](https://www.devloop.software/)

---

## Table of Contents

- [Features](#features)
- [Routes](#routes)
- [Tech Stack](#tech-stack)
- [Data Models](#data-models)
- [Project Structure](#project-structure)
- [SEO and AI Discoverability](#seo-and-ai-discoverability)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Features

| Feature               | Description                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Offline-First Storage | Works with localStorage. Cloud sync via Supabase is optional.                                        |
| Smart Notes           | Q&A format with syntax-highlighted code snippets, understanding levels (1-5), and priority flagging. |
| Visual Analytics      | Interactive charts for study time, mood trends, understanding distribution, and course progress.     |
| Spaced Repetition     | Quiz mode with flip cards for flagged notes, plus session summaries with accuracy stats.             |
| Course Organization   | Track courses with instructors, resource links, and topic tags.                                      |
| Daily Tracking        | Log study time (minutes) and mood (1-5) with optional notes.                                         |
| Responsive Design     | Mobile-first design with dark/light modes.                                                           |
| SEO Optimized         | Sitemap, robots.txt, JSON-LD structured data, and llms.txt for AI discoverability.                   |

---

## Routes

| Path              | Description                     |
| ----------------- | ------------------------------- |
| `/`               | Public landing page             |
| `/overview`       | Dashboard with charts and stats |
| `/notes`          | View, filter, and manage notes  |
| `/courses`        | Manage courses and resources    |
| `/daily-tracking` | Log study time and mood         |
| `/review`         | Spaced repetition practice      |
| `/learn-rootly`   | Onboarding and tutorial         |
| `/about`          | About the project               |
| `/login`          | Sign in with Google or GitHub   |

---

## Tech Stack

| Category      | Technology                            |
| ------------- | ------------------------------------- |
| Framework     | Next.js 15 (App Router)               |
| UI            | React 19, TypeScript, Tailwind CSS v4 |
| Components    | shadcn/ui, Radix UI                   |
| Charts        | Recharts                              |
| Forms         | React Hook Form + Zod                 |
| Notifications | Sonner                                |
| Backend       | Supabase (PostgreSQL, Auth, RLS)      |
| Icons         | Lucide React                          |
| Fonts         | Geist Sans/Mono                       |
| Theming       | next-themes                           |

---

## Data Models

### Course

```typescript
{
  id: string
  title: string
  instructor: string
  links: string[]
  topics: string[]
  created_at: string
  updated_at: string
}
```

### Note

```typescript
{
  id: string;
  course_id: string;
  question: string;
  answer: string;
  code_snippet: string | null;
  code_language: string;
  understanding_level: 1 | 2 | 3 | 4 | 5;
  flag: boolean;
  created_at: string;
  updated_at: string;
}
```

### DailyEntry

```typescript
{
  id: string;
  date: string; // YYYY-MM-DD
  study_time: number; // minutes
  mood: 1 | 2 | 3 | 4 | 5;
  notes: string;
  created_at: string;
  updated_at: string;
}
```

All tables use Row Level Security (RLS). Users only see their own data.

---

## Project Structure

```
rootly-notes-app/
├─ app/                 # Pages and routes
│  ├─ sitemap.ts        # Dynamic sitemap
│  ├─ robots.ts         # Robots.txt config
│  └─ layout.tsx        # Root layout with JSON-LD
├─ components/          # UI components
├─ hooks/               # Custom React hooks
├─ lib/                 # Utilities, types, and data layer
│  ├─ data/             # Storage abstraction (local + Supabase)
│  └─ supabase/         # Supabase client configuration
├─ public/              # Static assets
│  ├─ llms.txt          # AI summary
│  └─ llms-full.txt     # Comprehensive AI documentation
├─ scripts/             # Database migration scripts
└─ styles/              # Global CSS
```

---

## SEO and AI Discoverability

| Feature       | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| Sitemap       | Dynamic `sitemap.xml` with all routes and priorities                      |
| Robots.txt    | Crawler rules for search engines and AI bots (GPTBot, Claude, Perplexity) |
| JSON-LD       | WebApplication structured data for rich search results                    |
| OpenGraph     | Auto-generated social card images                                         |
| llms.txt      | Summary for AI systems                                                    |
| llms-full.txt | Comprehensive documentation for AI parsing                                |

---

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+
- Supabase account (optional, for cloud sync)

### Installation

```bash
# Clone the repository
git clone https://github.com/mo0hamed-shoaib/rootly-notes-app.git
cd rootly-notes-app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://rootly-notes-app.vercel.app
```

---

## Contributing

1. Fork and clone this repository
2. Install dependencies: `pnpm install`
3. Set up environment variables
4. Run SQL scripts in Supabase (if using cloud sync)
5. Start dev server: `pnpm dev`
6. Open a Pull Request with screenshots

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

- Search existing [Issues](https://github.com/mo0hamed-shoaib/rootly-notes-app/issues)
- Create a [new issue](https://github.com/mo0hamed-shoaib/rootly-notes-app/issues/new/choose)

---

<p align="center">
  Open sourced under <a href="https://www.devloop.software/">@Devloop</a>
</p>
