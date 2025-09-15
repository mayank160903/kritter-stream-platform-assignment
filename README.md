# ShowHub - TV Show Discovery Platform

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
git clone <your-repo-url>
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

## 🎨 Key Components

### HorizontalCarousel
- Smooth horizontal scrolling
- Navigation buttons
- Touch/swipe support
- Loading states

### TVShowCard
- Responsive show cards
- Hover animations
- Rating display
- Fallback images

### SearchBar
- Debounced search
- Type-ahead suggestions
- Keyboard navigation
- Loading indicators

## 🔧 API Integration

The app integrates with TMDB API endpoints:

- `GET /trending/tv/day` - Trending shows
- `GET /tv/top_rated` - Top rated shows  
- `GET /tv/popular` - Popular shows
- `GET /search/tv` - Search shows
- `GET /tv/{id}` - Show details
- `GET /tv/{id}/season/{season_number}` - Season episodes

## 📱 Responsive Design

- **Mobile**: Touch-friendly carousels, full-width layouts
- **Tablet**: Optimized grid layouts
- **Desktop**: Hover effects, navigation buttons

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## 🎯 Performance

- **Lighthouse Score**: Target >85
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Images and components
- **Caching**: API response caching

## 🔮 Future Enhancements

- [ ] Episode viewer with vertical scrolling
- [ ] User favorites/bookmarks
- [ ] Advanced filtering and sorting
- [ ] User reviews and ratings
- [ ] Offline support with PWA
- [ ] Dark/light theme toggle
- [ ] Social sharing features

## 🐛 Known Issues

- Placeholder images need optimization
- Episode viewer not yet implemented
- Search results limited to 8 items
- No pagination for carousels

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

Built with ❤️ using Next.js and TMDB API