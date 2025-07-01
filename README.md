# 📚 Bookdio Mobile App

A comprehensive React-based audiobook application inspired by [bookdio.org](https://bookdio.org), designed to provide users with a 10-minute shortcut to the world's best books through audiobook summaries and full-length content.

![Bookdio App](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop)

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Installation & Running

1. **Navigate to the project directory**
   ```bash
   cd "Bookdio mobile app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to `http://localhost:3000`

That's it! The app should now be running locally on your machine.

## 📱 Features

### Core Features
- ✅ **Real Book Library** - 20+ popular audiobooks with actual covers
- ✅ **Bookdio.org Design** - Authentic design inspired by the original website
- ✅ **Mobile-First** - Optimized for mobile devices with responsive design
- ✅ **Dark/Light Theme** - Toggle between themes with persistent settings
- ✅ **Search Functionality** - Search books by title, author, or genre
- ✅ **Audio Player** - Full-featured audio player with controls
- ✅ **Bookmark System** - Save your favorite books
- ✅ **Download Manager** - Offline reading capabilities
- ✅ **User Authentication** - Sign up/login with email or Google

### Content Features
- 📚 **60+ Live Categories** - Extensive categorization system
- 🌍 **Multi-language Support** - English, Hindi, and Marathi books
- 🎯 **Genre-based Browsing** - Business, Self-Help, Fiction, and more
- ⭐ **Rating System** - Book ratings and reviews
- 🔥 **Trending Books** - Popular and latest releases
- 📖 **Cherry Tales** - Curated book summaries

### Technical Features
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 📱 **PWA Ready** - Progressive Web App capabilities
- 🖥️ **Electron Support** - Can be packaged as desktop app
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- 🔄 **React Router** - Smooth navigation between pages

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Electron (Desktop App)
npm run electron     # Run as desktop app
npm run electron-dev # Development with Electron
npm run dist         # Build desktop app
```

## 📁 Project Structure

```
Bookdio mobile app/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── sw.js             # Service worker
├── src/
│   ├── components/        # Reusable React components
│   │   ├── AudioPlayer.jsx
│   │   ├── BookCard.jsx
│   │   ├── Layout.jsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── AudiobooksContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── GenresPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── ...
│   ├── assets/           # Images and static files
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── electron/             # Electron main process
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#0284c7` (Bookdio brand color)
- **Secondary**: Purple gradients for special features
- **Success**: Green for downloads and positive actions
- **Warning**: Yellow/Orange for bookmarks and premium features

### Typography
- **Font**: Inter (system fallback: system-ui, sans-serif)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent padding and hover states
- **Icons**: Lucide React icon library

## 📚 Book Data

The app includes 20 carefully selected audiobooks with:
- Real book covers from popular titles
- Authentic metadata (author, narrator, duration, rating)
- Multiple genres and categories
- Both popular and latest releases

### Featured Books Include:
- Gone Girl by Gillian Flynn
- Atomic Habits by James Clear
- The Silent Patient by Alex Michaelides
- Becoming by Michelle Obama
- Sapiens by Yuval Noah Harari
- And many more...

## 🔧 Troubleshooting

### Common Issues

**1. "ERR_CONNECTION_REFUSED" Error**
```bash
# Make sure dependencies are installed
npm install

# Start the development server
npm run dev

# Wait for "Local: http://localhost:3000" message
# Then open the URL in your browser
```

**2. Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

**3. Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build
```

## 🌐 Deployment Options

### Web Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

### Desktop App (Electron)
```bash
# Build desktop app for current platform
npm run dist

# The app will be in dist-electron/ folder
```

### Mobile App (Capacitor - Future)
The project structure supports adding Capacitor for native mobile apps.

## 🔒 Environment Variables

Create a `.env` file for configuration:
```env
VITE_APP_NAME=Bookdio Mobile App
VITE_API_URL=your-api-url
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Book covers and content are used for demonstration only.

## 🙏 Acknowledgments

- **Bookdio.org** - Original design inspiration
- **Goodreads** - Book cover images
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - Amazing framework

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Make sure you have the latest Node.js version
3. Try deleting `node_modules` and running `npm install` again
4. Check that port 3000 is available

## 🚀 Future Enhancements

- [ ] Real audio playback functionality
- [ ] User progress tracking
- [ ] Social features (sharing, reviews)
- [ ] Offline mode improvements
- [ ] Native mobile app (iOS/Android)
- [ ] Backend integration
- [ ] Payment system for premium features

---

**Made with ❤️ for audiobook lovers everywhere**

*Inspired by the amazing work at [bookdio.org](https://bookdio.org)*