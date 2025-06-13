# Study Timer - Focus & Achieve

A modern, minimalist study timer application built with Next.js, React, and Firebase. Track your study time, set goals, stay motivated, and achieve your learning objectives.

## Features

### 🔐 Authentication
- Mandatory Google login using Firebase Authentication
- User profile with anime avatar (randomly assigned based on user ID)
- Secure user session management

### ⏱️ Stopwatch Timer
- Manual Start/Pause/Reset functionality
- Persistent timer state across sessions using Firebase Firestore
- Real-time tracking of daily and total study time
- Session counting and statistics

### 🎯 Goals Feature
- Set daily or weekly study goals (in minutes/hours)
- Visual progress tracking with animated progress bars
- Goal achievement notifications
- Flexible goal management

### 🧠 Motivation Quotes
- Random motivational quotes from external API (Quotable)
- Fallback to curated quote collection
- Refresh quotes on demand or automatically
- Keyboard shortcut support

### 🎥 Dynamic Background
- Support for both image and video backgrounds
- Auto-changing backgrounds every 5 minutes (configurable)
- YouTube video embedding support
- High-quality Unsplash images
- User-configurable background preferences

### 🎨 UI & Design
- Minimalist, clean design with Tailwind CSS
- Fully responsive layout for all devices
- Dark/Light mode toggle with system preference detection
- Smooth animations with Framer Motion
- Glassmorphism effects with backdrop blur

### 🎯 New Features Added
- **Random Motivation Codes**: Generate unique alphanumeric codes for inspiration (e.g., "FOCUS2024XQWIN")
- **Enhanced Background Support**: Added YouTube video backgrounds for study-friendly ambient content
- **Persistent Hour Tracking**: Timer now always continues from where you left off after login
- **Enhanced UI**: Added motivation code display with styling and controls

### ⌨️ Keyboard Shortcuts
- `Space` - Start/Pause timer
- `R` - Reset timer (when not running)
- `Q` - Get new motivational quote
- `C` - Generate new motivation code
- `B` - Toggle background mode (Video → YouTube → Images)

## Tech Stack

- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication + Firestore)
- **Icons**: React Icons
- **Font**: Inter (Google Fonts)
- **TypeScript**: Full type safety

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page component
├── components/
│   ├── BackgroundManager.tsx # Dynamic background handling
│   ├── Dashboard.tsx         # Main dashboard layout
│   ├── Goals.tsx            # Goal setting and tracking
│   ├── Header.tsx           # Navigation and user controls
│   ├── LoginScreen.tsx      # Authentication screen
│   ├── MotivationQuotes.tsx # Quote display and fetching
│   └── StudyTimer.tsx       # Timer functionality
├── contexts/
│   ├── AuthContext.tsx      # Authentication state management
│   ├── StudyTimerContext.tsx # Timer and Firestore integration
│   └── ThemeContext.tsx     # Dark/light mode management
├── hooks/
│   ├── useAnimeAvatar.ts    # Avatar generation logic
│   ├── useBackgroundManager.ts # Background switching
│   └── useQuotes.ts         # Quote fetching and caching
├── lib/
│   └── firebase.ts          # Firebase configuration
└── utils/
    └── time.ts              # Time formatting utilities
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd study-timer-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Google sign-in provider
   - Add your domain to authorized domains

3. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

4. Get Firebase configuration:
   - Go to Project Settings → General
   - Scroll down to "Your apps" and click "Web"
   - Copy the configuration object

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firebase Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow access to user's subcollections
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 6. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Features in Detail

### Timer Persistence
The timer state is automatically saved to Firestore every 5 seconds, ensuring that users never lose their progress even if they close the browser or lose internet connection.

### Goal System
Users can set daily or weekly study goals. The system tracks progress in real-time and provides visual feedback through animated progress bars.

### Background System
The application supports two background modes:
- **Images**: High-quality nature and study-focused images from Unsplash
- **Videos**: YouTube video backgrounds with custom embed parameters

### Quote System
Motivational quotes are fetched from the Quotable API with a fallback system to ensure quotes are always available even when the API is down.

### Responsive Design
The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## Customization

### Adding New Background Images
Edit `src/hooks/useBackgroundManager.ts` and add URLs to the `backgroundImages` array.

### Adding New Background Videos
Edit `src/hooks/useBackgroundManager.ts` and add YouTube embed URLs to the `backgroundVideos` array.

### Adding New Quotes
Edit `src/hooks/useQuotes.ts` and add quotes to the `fallbackQuotes` array.

### Changing Color Scheme
Edit `tailwind.config.ts` to customize the color palette.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for students and learners everywhere.