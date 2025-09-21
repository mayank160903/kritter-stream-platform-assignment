# ShowHub - TV Show Discovery Platform

View Website - [deployed vercel link](https://mayank-binge-and-chill.vercel.app/)

A modern, Netflix-inspired TV show discovery platform built with Next.js, TypeScript, and Tailwind CSS. Discover trending, top-rated, and popular TV shows with a beautiful, responsive interface.

## 🚀 Features

### Core Features
- **Home Page**: Netflix-style layout with horizontal scrolling carousels
- **Trending Shows**: Real-time trending TV shows from TMDB API
- **Top Rated**: Browse the highest-rated TV series
- **Popular Shows**: Discover what's popular right now
- **Search Functionality**: Type-ahead search with debounced API calls
- **Responsive Design**: Optimized for both mobile and desktop
- **Smooth Animations**: Framer Motion powered transitions and hover effects

### UI/UX Features
- **Horizontal Carousels**: Smooth scrolling show collections
- **Hero Section**: Featured trending show with backdrop
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful fallbacks for API failures
- **Image Optimization**: Next.js Image component with fallbacks
- **Dark Theme**: Netflix-inspired dark UI

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API**: The Movie Database (TMDB) API
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mayank160903/kritter-stream-platform-assignment
cd tv-show-discovery
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### 4. Get TMDB API Key
1. Visit [themoviedb.org](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings > API
4. Request an API key (v3 auth)
5. Copy your API key to `.env.local`

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── carousel/          # Carousel components
│   ├── layout/            # Layout components
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```


## 📱 Responsive Design

- **Mobile**: Touch-friendly carousels, full-width layouts
- **Tablet**: Optimized grid layouts
- **Desktop**: Hover effects, navigation buttons

## 🔮 Future Enhancements

- [ ] Advanced filtering and sorting
- [ ] User reviews and ratings
- [ ] Dark/light theme toggle
- [ ] Social sharing features
