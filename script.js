// Global variables
let timer = {
    startTime: null,
    elapsedTime: 0,
    isRunning: false,
    interval: null
};

let user = null;
let currentBackgroundMode = 'video'; // 'video', 'youtube', or 'image'
let currentBackgroundIndex = 0;
let currentMotivationCode = '';

// Background videos and images
const backgroundVideos = [
    'https://cdn.pixabay.com/vimeo/460080940/clouds.mp4?width=1280&hash=92d83ed7bc51b325cfe6e97c6f7c4b7d3b3e0c7b',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

// YouTube video backgrounds (embedded) - Study-friendly ambient videos
const youtubeVideos = [
    'jfKfPfyJRdk', // Lofi Hip Hop Radio
    '5qap5aO4i9A', // Relaxing Piano Music
    'lP26UCnoH9s', // Forest Sounds
    'WPni755-Krg', // Rain Sounds
    'nDq6TstdEi8', // Ocean Waves
    'YQQ2StSwg5o', // Fireplace Sounds
    'McVL4M8x3N0', // Study Music
    'dv3kcKAdy54', // Coffee Shop Ambience
    'DIx3aMRDUL4', // Library Ambience
    'tNkZsRW7h2c'  // Nature Sounds
];

const backgroundImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
];

// Motivational quotes
const motivationalQuotes = [
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
    { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman" },
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
    { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

// Motivation codes - random alphanumeric codes with inspirational meanings
const motivationCodeTemplates = [
    { prefix: 'FOCUS', suffix: 'WIN' },
    { prefix: 'STUDY', suffix: 'HARD' },
    { prefix: 'LEARN', suffix: 'GROW' },
    { prefix: 'PUSH', suffix: 'LIMITS' },
    { prefix: 'NEVER', suffix: 'QUIT' },
    { prefix: 'AIM', suffix: 'HIGH' },
    { prefix: 'STAY', suffix: 'STRONG' },
    { prefix: 'WORK', suffix: 'SMART' },
    { prefix: 'DREAM', suffix: 'BIG' },
    { prefix: 'RISE', suffix: 'UP' },
    { prefix: 'BREAK', suffix: 'LIMITS' },
    { prefix: 'UNLOCK', suffix: 'POTENTIAL' },
    { prefix: 'MASTER', suffix: 'SKILLS' },
    { prefix: 'ACHIEVE', suffix: 'GOALS' },
    { prefix: 'EXCEL', suffix: 'BEYOND' }
];

// DOM elements
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const timeDisplay = document.getElementById('timeDisplay');
const todayTime = document.getElementById('todayTime');
const totalTime = document.getElementById('totalTime');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const logoutBtn = document.getElementById('logoutBtn');
const backgroundToggle = document.getElementById('backgroundToggle');
const backgroundToggleText = document.getElementById('backgroundToggleText');
const motivationQuote = document.getElementById('motivationQuote');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const streakCount = document.getElementById('streakCount');
const sessionCount = document.getElementById('sessionCount');
const averageSession = document.getElementById('averageSession');
const backgroundVideo = document.getElementById('backgroundVideo');
const imageBackground = document.getElementById('imageBackground');
const motivationCodeDisplay = document.getElementById('motivationCode');
const newCodeBtn = document.getElementById('newCodeBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeBackgrounds();
    loadStoredUser();
    displayRandomQuote();
    generateRandomMotivationCode();
    
    // Event listeners
    startPauseBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    logoutBtn.addEventListener('click', logout);
    backgroundToggle.addEventListener('click', toggleBackground);
    newQuoteBtn.addEventListener('click', displayRandomQuote);
    if (newCodeBtn) {
        newCodeBtn.addEventListener('click', generateRandomMotivationCode);
    }
    
    // Auto-save timer state every 5 seconds
    setInterval(saveTimerState, 5000);
    
    // Change background every 5 minutes
    setInterval(changeBackground, 300000);
    
    // Generate new motivation code every 10 minutes
    setInterval(generateRandomMotivationCode, 600000);
});

// Google Sign-In callback
function handleCredentialResponse(response) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    };
    
    saveUser();
    showApp();
    loadUserData();
}

// Demo login function for testing without Google OAuth
function loginAsDemo() {
    user = {
        id: 'demo_user',
        name: 'Demo User',
        email: 'demo@studytimer.com',
        picture: 'https://via.placeholder.com/40/667eea/ffffff?text=D'
    };
    
    saveUser();
    showApp();
    loadUserData();
}

// Initialize backgrounds
function initializeBackgrounds() {
    // Create YouTube background container if not exists
    if (!document.getElementById('youtubeBackground')) {
        const youtubeContainer = document.createElement('div');
        youtubeContainer.id = 'youtubeBackground';
        youtubeContainer.className = 'youtube-background';
        youtubeContainer.style.display = 'none';
        document.body.appendChild(youtubeContainer);
    }
    
    // Set initial video background with error handling
    backgroundVideo.src = backgroundVideos[0];
    backgroundVideo.onerror = function() {
        console.warn('Video failed to load, switching to next video');
        changeBackground();
    };
    
    // Set initial image background
    imageBackground.style.backgroundImage = `url(${backgroundImages[0]})`;
    
    // Add error handling for image loading
    const img = new Image();
    img.onerror = function() {
        console.warn('Image failed to load, switching to next image');
        changeBackground();
    };
    img.src = backgroundImages[0];
}

// Change background periodically
function changeBackground() {
    let maxLength;
    switch (currentBackgroundMode) {
        case 'video':
            maxLength = backgroundVideos.length;
            break;
        case 'youtube':
            maxLength = youtubeVideos.length;
            break;
        case 'image':
            maxLength = backgroundImages.length;
            break;
        default:
            maxLength = backgroundVideos.length;
    }
    
    currentBackgroundIndex = (currentBackgroundIndex + 1) % maxLength;
    
    if (currentBackgroundMode === 'video') {
        backgroundVideo.src = backgroundVideos[currentBackgroundIndex];
    } else if (currentBackgroundMode === 'youtube') {
        loadYouTubeVideo(youtubeVideos[currentBackgroundIndex]);
    } else {
        imageBackground.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
    }
}

// Toggle between video, youtube, and image backgrounds
function toggleBackground() {
    const youtubeContainer = document.getElementById('youtubeBackground');
    
    // Hide all backgrounds first
    backgroundVideo.parentElement.style.display = 'none';
    imageBackground.style.display = 'none';
    if (youtubeContainer) {
        youtubeContainer.style.display = 'none';
    }
    
    if (currentBackgroundMode === 'video') {
        currentBackgroundMode = 'youtube';
        if (youtubeContainer) {
            youtubeContainer.style.display = 'block';
            loadYouTubeVideo(youtubeVideos[currentBackgroundIndex]);
        }
        backgroundToggleText.textContent = 'Switch to Images';
    } else if (currentBackgroundMode === 'youtube') {
        currentBackgroundMode = 'image';
        imageBackground.style.display = 'block';
        backgroundToggleText.textContent = 'Switch to Videos';
    } else {
        currentBackgroundMode = 'video';
        backgroundVideo.parentElement.style.display = 'block';
        backgroundToggleText.textContent = 'Switch to YouTube';
    }
    
    localStorage.setItem('backgroundMode', currentBackgroundMode);
}

// Load stored user
function loadStoredUser() {
    const storedUser = localStorage.getItem('studyTimerUser');
    if (storedUser) {
        user = JSON.parse(storedUser);
        showApp();
        loadUserData();
    }
    
    // Load background preference
    const backgroundMode = localStorage.getItem('backgroundMode');
    if (backgroundMode && backgroundMode !== currentBackgroundMode) {
        // Set the background mode and initialize the display properly
        const originalMode = currentBackgroundMode;
        currentBackgroundMode = backgroundMode;
        
        // Show the correct background based on saved preference
        const youtubeContainer = document.getElementById('youtubeBackground');
        backgroundVideo.parentElement.style.display = 'none';
        imageBackground.style.display = 'none';
        if (youtubeContainer) {
            youtubeContainer.style.display = 'none';
        }
        
        if (currentBackgroundMode === 'video') {
            backgroundVideo.parentElement.style.display = 'block';
            backgroundToggleText.textContent = 'Switch to YouTube';
        } else if (currentBackgroundMode === 'youtube') {
            if (youtubeContainer) {
                youtubeContainer.style.display = 'block';
                loadYouTubeVideo(youtubeVideos[currentBackgroundIndex]);
            }
            backgroundToggleText.textContent = 'Switch to Images';
        } else {
            imageBackground.style.display = 'block';
            backgroundToggleText.textContent = 'Switch to Videos';
        }
    }
}

// Save user to localStorage
function saveUser() {
    localStorage.setItem('studyTimerUser', JSON.stringify(user));
}

// Show the main app interface
function showApp() {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'flex';
    
    userAvatar.src = user.picture;
    userName.textContent = user.name;
}

// Load user data from localStorage
function loadUserData() {
    const userData = localStorage.getItem(`studyData_${user.id}`);
    if (userData) {
        const data = JSON.parse(userData);
        
        // Load timer state
        timer.elapsedTime = data.elapsedTime || 0;
        timer.startTime = data.startTime;
        timer.isRunning = data.isRunning || false;
        
        // If timer was running when page was closed, calculate elapsed time
        if (timer.isRunning && timer.startTime) {
            const now = Date.now();
            const timeSinceStart = now - timer.startTime;
            timer.elapsedTime += timeSinceStart;
            startTimer();
        }
        
        // Load statistics
        updateStatistics(data.stats || {});
    }
    
    updateDisplay();
}

// Save timer state
function saveTimerState() {
    if (!user) return;
    
    const userData = {
        elapsedTime: timer.elapsedTime,
        startTime: timer.startTime,
        isRunning: timer.isRunning,
        lastSaved: Date.now(),
        stats: getStatistics()
    };
    
    localStorage.setItem(`studyData_${user.id}`, JSON.stringify(userData));
}

// Timer functions
function toggleTimer() {
    if (timer.isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (!timer.isRunning) {
        timer.startTime = Date.now() - timer.elapsedTime;
        timer.isRunning = true;
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('btn-danger');
        startPauseBtn.classList.remove('btn-primary');
        document.querySelector('.timer-section').classList.add('timer-active');
        
        timer.interval = setInterval(updateTimer, 1000);
        
        // Update session count
        incrementSessionCount();
    }
}

function pauseTimer() {
    if (timer.isRunning) {
        timer.isRunning = false;
        timer.elapsedTime = Date.now() - timer.startTime;
        clearInterval(timer.interval);
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.add('btn-primary');
        startPauseBtn.classList.remove('btn-danger');
        document.querySelector('.timer-section').classList.remove('timer-active');
        
        saveTimerState();
    }
}

function resetTimer() {
    timer.isRunning = false;
    timer.elapsedTime = 0;
    timer.startTime = null;
    clearInterval(timer.interval);
    
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.add('btn-primary');
    startPauseBtn.classList.remove('btn-danger');
    document.querySelector('.timer-section').classList.remove('timer-active');
    
    updateDisplay();
    saveTimerState();
}

function updateTimer() {
    if (timer.isRunning) {
        timer.elapsedTime = Date.now() - timer.startTime;
        updateDisplay();
        checkStudyMilestones();
    }
}

// Format time display
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update display
function updateDisplay() {
    timeDisplay.textContent = formatTime(timer.elapsedTime);
    
    const todayTotal = getTodayStudyTime();
    const overallTotal = getTotalStudyTime();
    
    todayTime.textContent = formatTime(todayTotal);
    totalTime.textContent = formatTime(overallTotal);
}

// Get today's total study time
function getTodayStudyTime() {
    const today = new Date().toDateString();
    const dailyData = localStorage.getItem(`dailyStudy_${user.id}_${today}`);
    
    if (dailyData) {
        return JSON.parse(dailyData).totalTime + timer.elapsedTime;
    }
    
    return timer.elapsedTime;
}

// Get total study time across all days
function getTotalStudyTime() {
    let total = 0;
    
    // Get all daily study records
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`dailyStudy_${user.id}_`)) {
            const data = JSON.parse(localStorage.getItem(key));
            total += data.totalTime;
        }
    }
    
    return total + timer.elapsedTime;
}

// Update daily study record
function updateDailyRecord() {
    const today = new Date().toDateString();
    const key = `dailyStudy_${user.id}_${today}`;
    const existingData = localStorage.getItem(key);
    
    let dailyData = existingData ? JSON.parse(existingData) : {
        date: today,
        totalTime: 0,
        sessions: 0
    };
    
    dailyData.totalTime += timer.elapsedTime;
    localStorage.setItem(key, JSON.stringify(dailyData));
}

// Increment session count
function incrementSessionCount() {
    const today = new Date().toDateString();
    const key = `dailyStudy_${user.id}_${today}`;
    const existingData = localStorage.getItem(key);
    
    let dailyData = existingData ? JSON.parse(existingData) : {
        date: today,
        totalTime: 0,
        sessions: 0
    };
    
    dailyData.sessions += 1;
    localStorage.setItem(key, JSON.stringify(dailyData));
    
    updateStatisticsDisplay();
}

// Get statistics
function getStatistics() {
    const today = new Date().toDateString();
    let streak = 0;
    let todaySessions = 0;
    let totalSessions = 0;
    let totalStudyTime = 0;
    
    // Calculate streak
    let currentDate = new Date();
    while (true) {
        const dateStr = currentDate.toDateString();
        const key = `dailyStudy_${user.id}_${dateStr}`;
        const data = localStorage.getItem(key);
        
        if (data) {
            const dailyData = JSON.parse(data);
            if (dailyData.totalTime > 0) {
                streak++;
                totalSessions += dailyData.sessions;
                totalStudyTime += dailyData.totalTime;
                
                if (dateStr === today) {
                    todaySessions = dailyData.sessions;
                }
            } else {
                break;
            }
        } else {
            break;
        }
        
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    const averageSessionTime = totalSessions > 0 ? Math.round((totalStudyTime / totalSessions) / 60000) : 0;
    
    return {
        streak,
        todaySessions,
        averageSessionTime
    };
}

// Update statistics display
function updateStatisticsDisplay() {
    const stats = getStatistics();
    updateStatistics(stats);
}

function updateStatistics(stats) {
    streakCount.textContent = stats.streak || 0;
    sessionCount.textContent = stats.todaySessions || 0;
    averageSession.textContent = stats.averageSessionTime || 0;
}

// Display random motivational quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[randomIndex];
    
    motivationQuote.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
}

// Generate random motivation code
function generateRandomMotivationCode() {
    const template = motivationCodeTemplates[Math.floor(Math.random() * motivationCodeTemplates.length)];
    const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    const randomLetters = Math.random().toString(36).substring(2, 4).toUpperCase();
    
    currentMotivationCode = `${template.prefix}${randomNum}${randomLetters}${template.suffix}`;
    
    if (motivationCodeDisplay) {
        motivationCodeDisplay.textContent = currentMotivationCode;
    }
}

// Load YouTube video
function loadYouTubeVideo(videoId) {
    const youtubeContainer = document.getElementById('youtubeBackground');
    if (!youtubeContainer) return;
    
    youtubeContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            frameborder="0" 
            allow="autoplay; encrypted-media" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
        </iframe>
        <div class="video-overlay"></div>
    `;
}

// Logout function
function logout() {
    // Save current session before logout
    if (timer.isRunning) {
        pauseTimer();
        updateDailyRecord();
    }
    
    // Clear user data
    localStorage.removeItem('studyTimerUser');
    user = null;
    
    // Reset timer
    resetTimer();
    
    // Show login screen
    appContainer.style.display = 'none';
    loginContainer.style.display = 'flex';
    
    // Sign out from Google
    if (google && google.accounts && google.accounts.id) {
        google.accounts.id.disableAutoSelect();
    }
}

// Page visibility API to handle tab switching
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Tab is hidden, save state
        if (timer.isRunning) {
            saveTimerState();
        }
    } else {
        // Tab is visible again, recalculate elapsed time if timer was running
        if (timer.isRunning && timer.startTime) {
            const now = Date.now();
            timer.elapsedTime = now - timer.startTime;
            updateDisplay();
        }
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    if (timer.isRunning) {
        updateDailyRecord();
        saveTimerState();
    }
});

// Handle periodic background changes
setInterval(function() {
    if (Math.random() < 0.3) { // 30% chance every interval
        displayRandomQuote();
    }
}, 120000); // Every 2 minutes

// Auto-update statistics every minute
setInterval(updateStatisticsDisplay, 60000);

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Only handle shortcuts when app is visible and not in an input field
    if (appContainer.style.display === 'none' || 
        event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Space bar to start/pause timer
    if (event.code === 'Space') {
        event.preventDefault();
        toggleTimer();
    }
    
    // R key to reset timer
    if (event.code === 'KeyR' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        resetTimer();
    }
    
    // Q key for new quote
    if (event.code === 'KeyQ' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        displayRandomQuote();
    }
    
    // B key to toggle background
    if (event.code === 'KeyB' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        toggleBackground();
    }
    
    // C key for new motivation code
    if (event.code === 'KeyC' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        generateRandomMotivationCode();
    }
});

// Create simple notification sound
function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio notification not available');
    }
}

// Add notification for study milestones
function checkStudyMilestones() {
    const currentMinutes = Math.floor(timer.elapsedTime / 60000);
    const milestones = [25, 45, 60, 90, 120]; // Pomodoro and other common intervals
    
    milestones.forEach(milestone => {
        const key = `milestone_${milestone}_${user.id}_${new Date().toDateString()}`;
        if (currentMinutes >= milestone && !localStorage.getItem(key)) {
            localStorage.setItem(key, 'true');
            playNotificationSound();
            
            // Show a subtle notification
            showMilestoneNotification(milestone);
        }
    });
}

// Show milestone notification
function showMilestoneNotification(minutes) {
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `
        <div class="milestone-content">
            <strong>Great job! 🎉</strong><br>
            You've studied for ${minutes} minutes!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}