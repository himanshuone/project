# Study Timer - Focus & Achieve

A beautiful, feature-rich study timer web application with Google authentication, motivational quotes, and dynamic backgrounds.

## Features

- ⏱️ **Persistent Timer**: Study timer that remembers your progress even after closing the browser
- 🔐 **Google Login**: Secure authentication using Google OAuth
- 💪 **Motivational Quotes**: Random inspirational quotes to keep you motivated
- 🎬 **Dynamic Backgrounds**: Switch between beautiful videos and images
- 📊 **Study Statistics**: Track your study streaks, sessions, and average study time
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 💾 **Local Storage**: All data is stored locally in your browser for privacy

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add your domain to authorized origins (for local development, add `http://localhost:3000` or your preferred port)
6. Copy the Client ID

### 2. Configure the Application

1. Open `index.html`
2. Find the line with `data-client_id="YOUR_GOOGLE_CLIENT_ID"`
3. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google OAuth Client ID

### 3. Run the Application

Since this is a client-side application, you can run it using any static file server:

#### Option 1: Using Python (if installed)
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

#### Option 2: Using Node.js (if installed)
```bash
npx serve . -p 3000
```

#### Option 3: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000` (or your configured port)

## How to Use

1. **Login**: Click the "Sign in with Google" button to authenticate
2. **Start Studying**: Click the "Start" button to begin your study session
3. **Pause/Resume**: Click "Pause" to take a break, then "Start" to resume
4. **Reset**: Click "Reset" to start a new session
5. **Background**: Toggle between video and image backgrounds using the button in the header
6. **Quotes**: Click "New Quote" to get fresh motivation
7. **Statistics**: View your study progress in the statistics section

## Data Storage

All your study data is stored locally in your browser using localStorage. This includes:
- Current timer state
- Daily study records
- Study statistics
- User preferences

Your data is private and never leaves your device.

## Customization

### Adding New Backgrounds

To add new background videos or images, edit the arrays in `script.js`:

```javascript
// Add new video URLs
const backgroundVideos = [
    'your-video-url-1.mp4',
    'your-video-url-2.mp4',
    // ... existing videos
];

// Add new image URLs
const backgroundImages = [
    'your-image-url-1.jpg',
    'your-image-url-2.jpg',
    // ... existing images
];
```

### Adding New Quotes

To add new motivational quotes, edit the array in `script.js`:

```javascript
const motivationalQuotes = [
    { text: "Your new quote here", author: "Author Name" },
    // ... existing quotes
];
```

## Browser Compatibility

This application works on all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage
- HTML5 Video

## Privacy

- No data is sent to external servers except for Google authentication
- All study data is stored locally in your browser
- Background images/videos are loaded from external sources (Unsplash, Pixabay)

## Contributing

Feel free to contribute by:
- Adding new motivational quotes
- Suggesting new background sources
- Improving the UI/UX
- Adding new features

## License

This project is open source and available under the MIT License.