import React, { createContext, useContext, useState } from 'react'

const AudiobooksContext = createContext()

export const useAudiobooks = () => {
  const context = useContext(AudiobooksContext)
  if (!context) {
    throw new Error('useAudiobooks must be used within an AudiobooksProvider')
  }
  return context
}

// Exact books from bookdio.org website with real book covers
const mockAudiobooks = [
  {
    id: 1,
    title: "Gone Girl",
    author: "GILLIAN FLYNN",
    narrator: "Julia Whelan",
    genre: "Mystery",
    language: "English",
    duration: "410 pages",
    rating: 4.8,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg",
    description: "A psychological thriller about a marriage gone terribly wrong.",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Mystery"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "JAMES CLEAR",
    narrator: "James Clear",
    genre: "Self Help",
    language: "English",
    duration: "285 pages",
    rating: 4.9,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
    description: "Tiny Changes, Remarkable Results - An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Self Help"
  },
  {
    id: 3,
    title: "Gulamgiri",
    author: "JYOTIBA PHULE",
    narrator: "Marathi Narrator",
    genre: "Historical",
    language: "Hindi",
    duration: "41 pages",
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348250103i/6186395.jpg",
    description: "A groundbreaking work on social reform and equality",
    isPopular: false,
    isLatest: true,
    price: "Free",
    category: "Historical"
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "ALEX MICHAELIDES",
    narrator: "Jack Hawkins",
    genre: "Fiction",
    language: "English",
    duration: "281 pages",
    rating: 4.6,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582398773i/40097951.jpg",
    description: "A psychological thriller about a woman who refuses to speak",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Fiction"
  },
  {
    id: 5,
    title: "The Shining",
    author: "STEPHEN KING",
    narrator: "Campbell Scott",
    genre: "Horror",
    language: "English",
    duration: "287 pages",
    rating: 4.5,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg",
    description: "A classic horror novel about isolation and madness",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Horror"
  },
  {
    id: 6,
    title: "Misery",
    author: "STEPHEN KING",
    narrator: "Lindsay Crouse",
    genre: "Horror",
    language: "English",
    duration: "304 pages",
    rating: 4.4,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1355344711i/10614.jpg",
    description: "A psychological horror novel about obsession and captivity",
    isPopular: false,
    isLatest: true,
    price: "Free",
    category: "Horror"
  },
  {
    id: 7,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    narrator: "Chris Hill",
    genre: "Business",
    language: "English",
    duration: "256 pages",
    rating: 4.8,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    description: "Timeless lessons on wealth, greed, and happiness",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Business"
  },
  {
    id: 8,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    narrator: "Tim Wheeler",
    genre: "Finance",
    language: "English",
    duration: "195 pages",
    rating: 4.6,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388211242i/69571.jpg",
    description: "What the Rich Teach Their Kids About Money",
    isPopular: false,
    isLatest: true,
    price: "Free",
    category: "Finance"
  },
  {
    id: 9,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    narrator: "Erik Synnestvedt",
    genre: "Motivational",
    language: "English",
    duration: "238 pages",
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
    description: "The Landmark Bestseller Now Revised and Updated",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Motivational"
  },
  {
    id: 10,
    title: "Becoming",
    author: "Michelle Obama",
    narrator: "Michelle Obama",
    genre: "Biography",
    language: "English",
    duration: "426 pages",
    rating: 4.9,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528206996i/38746485.jpg",
    description: "Intimate memoir by former First Lady Michelle Obama",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Biography"
  },
  {
    id: 11,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    narrator: "Stephen R. Covey",
    genre: "Self Help",
    language: "English",
    duration: "372 pages",
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421842784i/36072.jpg",
    description: "Powerful Lessons in Personal Change",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Self Help"
  },
  {
    id: 12,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    narrator: "Derek Perkins",
    genre: "History",
    language: "English",
    duration: "443 pages",
    rating: 4.8,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg",
    description: "A Brief History of Humankind",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "History"
  },
  {
    id: 13,
    title: "The Alchemist",
    author: "Paulo Coelho",
    narrator: "Jeremy Irons",
    genre: "Fiction",
    language: "English",
    duration: "163 pages",
    rating: 4.5,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    description: "A magical story about following your dreams",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Fiction"
  },
  {
    id: 14,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    narrator: "Eckhart Tolle",
    genre: "Spirituality",
    language: "English",
    duration: "236 pages",
    rating: 4.6,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386925471i/6708.jpg",
    description: "A Guide to Spiritual Enlightenment",
    isPopular: false,
    isLatest: true,
    price: "Free",
    category: "Spirituality"
  },
  {
    id: 15,
    title: "1984",
    author: "George Orwell",
    narrator: "Simon Prebble",
    genre: "Fiction",
    language: "English",
    duration: "328 pages",
    rating: 4.7,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    description: "A dystopian social science fiction novel",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Fiction"
  },
  {
    id: 16,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    narrator: "Roger Wayne",
    genre: "Self Help",
    language: "English",
    duration: "212 pages",
    rating: 4.4,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg",
    description: "A Counterintuitive Approach to Living a Good Life",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Self Help"
  },
  {
    id: 17,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    narrator: "Jake Gyllenhaal",
    genre: "Classic Literature",
    language: "English",
    duration: "180 pages",
    rating: 4.3,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
    description: "A classic American novel set in the Jazz Age",
    isPopular: false,
    isLatest: false,
    price: "Free",
    category: "Classic Literature"
  },
  {
    id: 18,
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick",
    genre: "Science Fiction",
    language: "English",
    duration: "688 pages",
    rating: 4.8,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    description: "Epic science fiction novel about politics, religion, and ecology",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Science Fiction"
  },
  {
    id: 19,
    title: "The Midnight Library",
    author: "Matt Haig",
    narrator: "Carey Mulligan",
    genre: "Fiction",
    language: "English",
    duration: "288 pages",
    rating: 4.3,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    description: "A novel about life, death, and all the other lives you might have lived",
    isPopular: true,
    isLatest: true,
    price: "Free",
    category: "Fiction"
  },
  {
    id: 20,
    title: "Can't Hurt Me",
    author: "David Goggins",
    narrator: "David Goggins",
    genre: "Biography",
    language: "English",
    duration: "364 pages",
    rating: 4.9,
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1536184191i/41721428.jpg",
    description: "Master Your Mind and Defy the Odds",
    isPopular: true,
    isLatest: false,
    price: "Free",
    category: "Biography"
  }
]

export const AudiobooksProvider = ({ children }) => {
  const [audiobooks] = useState(mockAudiobooks)
  const [bookmarks, setBookmarks] = useState([])
  const [downloads, setDownloads] = useState([])
  const [currentBook, setCurrentBook] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  // Categories exactly from bookdio.org
  const categories = [
    'All Books',
    'English Books',
    'Marathi Books',
    'Hindi Books',
    'Books Categories'
  ]

  // Live Categories as requested
  const liveCategories = [
    'American',
    'Animals',
    'Anti Racist',
    'Apocalypse',
    'Art',
    'Artificial Intelligence',
    'Astronomy',
    'Atheism',
    'Auto Biography',
    'Badass',
    'Banned Books',
    'Biography',
    'Business',
    'Communication',
    'Conspiracy Theories',
    'Creativity',
    'Cultural',
    'Dark Romance',
    'Death',
    'Demons',
    'Drama',
    'Education',
    'Entrepreneurship',
    'Environmental',
    'Erotic Fiction',
    'LGBTQ Romance',
    'Family',
    'Fantasy',
    'Fashion',
    'Feminism',
    'Fiction',
    'Finance',
    'Food and Drinks',
    'Gardening',
    'Goal setting',
    'Health and Fitness',
    'Historical',
    'Horror',
    'Humor',
    'Leadership',
    'Life Changing',
    'Literature',
    'Marathi Kadambari',
    'Marathi Katha',
    'Memoir',
    'Money & Investments',
    'Motivational',
    'Mystery',
    'Mythology',
    'Non - Fiction',
    'Philosophy',
    'Poetry',
    'Politics',
    'Psychology',
    'Romantic',
    'Science',
    'Science Fiction',
    'Self Help',
    'Sex and Relationship',
    'Spirituality',
    'Sports',
    'Thriller'
  ]

  const genres = [
    'Business',
    'Self Help', 
    'Biography',
    'Health and Fitness',
    'Historical',
    'Science',
    'Fiction',
    'Mystery',
    'Romance',
    'Fantasy',
    'Spirituality',
    'Politics',
    'Horror',
    'Thriller',
    'Finance',
    'Motivational',
    'Classic Literature',
    'Science Fiction',
    'History'
  ]

  const latestBooks = audiobooks.filter(book => book.isLatest)
  const popularBooks = audiobooks.filter(book => book.isPopular)
  const bookmarkedBooks = audiobooks.filter(book => bookmarks.includes(book.id))
  const downloadedBooks = audiobooks.filter(book => downloads.includes(book.id))

  const searchBooks = (query) => {
    if (!query) return audiobooks
    
    const lowercaseQuery = query.toLowerCase()
    return audiobooks.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery)
    )
  }

  const getBooksByGenre = (genre) => {
    return audiobooks.filter(book => book.genre === genre)
  }

  const getBooksByCategory = (category) => {
    if (category === 'All Books') return audiobooks
    if (category === 'English Books') return audiobooks.filter(book => book.language === 'English')
    if (category === 'Marathi Books') return audiobooks.filter(book => book.language === 'Marathi')
    if (category === 'Hindi Books') return audiobooks.filter(book => book.language === 'Hindi')
    return audiobooks
  }

  const toggleBookmark = (bookId) => {
    setBookmarks(prev => {
      const index = prev.indexOf(bookId)
      if (index > -1) {
        return prev.filter(id => id !== bookId)
      } else {
        return [...prev, bookId]
      }
    })
  }

  const toggleDownload = (bookId) => {
    setDownloads(prev => {
      const index = prev.indexOf(bookId)
      if (index > -1) {
        return prev.filter(id => id !== bookId)
      } else {
        return [...prev, bookId]
      }
    })
  }

  const playBook = (book) => {
    setCurrentBook(book)
    setIsPlaying(true)
    setCurrentTime(0)
    setDuration(300) // Mock duration in seconds
  }

  const pauseBook = () => {
    setIsPlaying(false)
  }

  const resumeBook = () => {
    setIsPlaying(true)
  }

  const stopBook = () => {
    setIsPlaying(false)
    setCurrentBook(null)
    setCurrentTime(0)
  }

  const seekTo = (time) => {
    setCurrentTime(time)
  }

  const setVolumeLevel = (newVolume) => {
    setVolume(newVolume)
  }

  return (
    <AudiobooksContext.Provider value={{
      audiobooks,
      bookmarks,
      downloads,
      currentBook,
      isPlaying,
      currentTime,
      duration,
      volume,
      categories,
      liveCategories,
      genres,
      latestBooks,
      popularBooks,
      bookmarkedBooks,
      downloadedBooks,
      searchBooks,
      getBooksByGenre,
      getBooksByCategory,
      toggleBookmark,
      toggleDownload,
      playBook,
      pauseBook,
      resumeBook,
      stopBook,
      seekTo,
      setVolume: setVolumeLevel
    }}>
      {children}
    </AudiobooksContext.Provider>
  )
}