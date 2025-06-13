// Configuration file for Study Timer
// Copy this file to config.js and update with your settings

const CONFIG = {
    // Google OAuth Client ID
    // Get this from https://console.cloud.google.com/
    GOOGLE_CLIENT_ID: 'your-google-client-id-here.apps.googleusercontent.com',
    
    // Optional: Custom background videos (add your own URLs)
    CUSTOM_VIDEOS: [
        // 'https://your-video-url-1.mp4',
        // 'https://your-video-url-2.mp4',
    ],
    
    // Optional: Custom background images (add your own URLs)
    CUSTOM_IMAGES: [
        // 'https://your-image-url-1.jpg',
        // 'https://your-image-url-2.jpg',
    ],
    
    // Optional: Custom motivational quotes
    CUSTOM_QUOTES: [
        // { text: "Your custom quote", author: "Author Name" },
    ]
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}