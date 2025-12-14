# Shivam GreenSolar Energy

A modern, responsive website for Shivam GreenSolar Energy - India's leading solar energy solutions provider.

## Project Overview

This project is a comprehensive solar energy solutions website built with modern web technologies, featuring information about residential, commercial, and industrial solar installations, solar calculators, and contact forms.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Supabase** - Backend as a Service (Database & API)

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- A Supabase account (sign up at https://app.supabase.com)

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Navigate to the project directory
cd ShivamGreenSolarEnergy

# Step 2: Install the necessary dependencies
npm install

# Step 3: Set up environment variables
cp .env.example .env
# Edit .env and add your Supabase credentials

# Step 4: Set up the database
# See SUPABASE_SETUP.md for detailed instructions
# Or run: node scripts/setup-database.js

# Step 5: Start the development server
npm run dev
```

The development server will start on `http://localhost:8080`

### Backend Setup (Supabase)

This project uses Supabase for backend services. To set up:

1. **Create a Supabase project** at https://app.supabase.com
2. **Get your API keys** from Settings → API
3. **Configure `.env` file** with your Supabase URL and anon key
4. **Run the database schema** - See `SUPABASE_SETUP.md` for detailed instructions

For complete setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/      # React components
│   ├── sections/   # Page sections (Hero, Services, etc.)
│   ├── shared/     # Shared components (Navbar, Footer, etc.)
│   └── ui/         # UI components from shadcn-ui
├── pages/          # Page components
├── hooks/          # Custom React hooks
└── lib/            # Utility functions
```

## Features

- Responsive design for all devices
- Modern UI with smooth animations
- Solar savings calculator with database storage
- Service detail pages
- Contact forms with database integration
- SEO optimized
- Backend integration with Supabase
- Secure data storage and retrieval

## License

All rights reserved. © Shivam GreenSolar Energy
