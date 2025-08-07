// Birthday Surprise App JavaScript
class BirthdaySurprise {
    constructor() {
        this.correctAnswer = 'bestie';
        this.currentScreen = 'welcome';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('welcome');
    }

    bindEvents() {
        // Start button event
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Start button clicked'); // Debug log
                this.showScreen('question');
            });
        }

        // Form submission event
        const answerForm = document.getElementById('answer-form');
        if (answerForm) {
            answerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAnswerSubmission();
            });
        }

        // Input field events
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.addEventListener('input', () => {
                this.hideErrorMessage();
            });

            // Enter key support for better UX
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleAnswerSubmission();
                }
            });
        }
    }

    showScreen(screenName) {
        console.log(`Transitioning to ${screenName} screen`); // Debug log
        
        // Hide all screens first
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Small delay to ensure clean transition
        setTimeout(() => {
            const targetScreen = document.getElementById(`${screenName}-screen`);
            if (targetScreen) {
                targetScreen.classList.add('active');
                this.currentScreen = screenName;
                console.log(`Successfully showed ${screenName} screen`); // Debug log

                // Focus on input if it's the question screen
                if (screenName === 'question') {
                    setTimeout(() => {
                        const answerInput = document.getElementById('answer-input');
                        if (answerInput) {
                            answerInput.focus();
                        }
                    }, 300);
                }

                // Handle video screen setup
                if (screenName === 'video') {
                    this.setupVideo();
                }
            } else {
                console.error(`Screen ${screenName}-screen not found`);
            }
        }, 150);
    }

    handleAnswerSubmission() {
        const answerInput = document.getElementById('answer-input');
        if (!answerInput) return;
        
        const userAnswer = answerInput.value.trim().toLowerCase();
        
        if (!userAnswer) {
            this.showErrorMessage('Please enter an answer! 💕');
            return;
        }

        if (userAnswer === this.correctAnswer.toLowerCase()) {
            this.showCorrectAnswer();
        } else {
            this.showErrorMessage();
            answerInput.value = '';
            answerInput.focus();
            
            // Add shake animation to the form
            const form = document.getElementById('answer-form');
            if (form) {
                form.style.animation = 'none';
                setTimeout(() => {
                    form.style.animation = 'shake 0.5s ease-in-out';
                }, 10);
            }
        }
    }

    showCorrectAnswer() {
        // Show loading overlay
        this.showLoading();

        // Simulate loading time for better UX
        setTimeout(() => {
            this.hideLoading();
            this.showScreen('video');
            this.celebrateCorrectAnswer();
        }, 2000);
    }

    celebrateCorrectAnswer() {
        // Add celebration effects
        this.createConfetti();
    }

    createConfetti() {
        const confettiElements = ['🎉', '🎊', '✨', '💕', '🎈', '⭐'];
        const container = document.body;

        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = confettiElements[Math.floor(Math.random() * confettiElements.length)];
            confetti.style.position = 'fixed';
            confetti.style.fontSize = '2rem';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            container.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }

        // Add confetti animation to CSS dynamically
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupVideo() {
        const video = document.getElementById('birthday-video');
        if (video) {
            video.preload = 'auto';
        }
        
        // Note: In a real implementation, the user would replace the video source
        // For now, we'll show a placeholder message
        if (!video || !video.src || video.src.includes('#')) {
            // Create a fallback message
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                const fallbackMessage = document.createElement('div');
                fallbackMessage.className = 'video-fallback';
                fallbackMessage.innerHTML = `
                    <div style="
                        background: var(--color-bg-2);
                        padding: var(--space-32);
                        border-radius: var(--radius-md);
                        text-align: center;
                        border: 2px dashed var(--color-border);
                    ">
                        <div style="font-size: 4rem; margin-bottom: var(--space-16);">🎥💕</div>
                        <h3 style="color: var(--color-text); margin-bottom: var(--space-16);">Video Placeholder</h3>
                        <p style="color: var(--color-text-secondary); margin: 0;">
                            Replace the video source in the HTML with your personal birthday message video.
                            <br><br>
                            <strong>Instructions:</strong><br>
                            1. Upload your video to a hosting service<br>
                            2. Replace the src="#" with your video URL<br>
                            3. Your sister will see your heartfelt message here! 💕
                        </p>
                    </div>
                `;
                
                videoContainer.appendChild(fallbackMessage);
                if (video) {
                    video.style.display = 'none';
                }
            }
        } else {
            // Try to autoplay the video (browsers may prevent this)
            video.play().catch(() => {
                console.log('Autoplay prevented by browser. User can manually play the video.');
            });
        }
    }

    showErrorMessage(customMessage = null) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            const messageP = errorMessage.querySelector('p');
            if (messageP) {
                if (customMessage) {
                    messageP.textContent = customMessage;
                } else {
                    messageP.textContent = "Hmm, that's not quite right. Think about what I always call you! 💕";
                }
            }
            errorMessage.classList.remove('hidden');
            
            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                this.hideErrorMessage();
            }, 5000);
        }
    }

    hideErrorMessage() {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
    }

    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    // Utility method to add extra birthday magic
    addBirthdayMagic() {
        // Add random sparkle effects
        setInterval(() => {
            if (Math.random() < 0.3 && this.currentScreen === 'welcome') {
                this.createSparkle();
            }
        }, 3000);
    }

    createSparkle() {
        const sparkles = ['✨', '⭐', '🌟'];
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.zIndex = '10';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'twinkle 2s ease-in-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

// Global variable to store the app instance for debugging
let birthdaySurpriseApp;

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...'); // Debug log
    
    birthdaySurpriseApp = new BirthdaySurprise();
    
    // Add extra birthday magic
    setTimeout(() => {
        birthdaySurpriseApp.addBirthdayMagic();
    }, 1000);
    
    // Add some console love for the birthday girl
    console.log(`
    🎉 Happy Birthday! 🎉
    
    This special webpage was made with love just for you!
    Hope you enjoy your surprise! 💕
    
    P.S. - Check the source code for some extra birthday messages! 🎂
    `);
});

// Add keyboard shortcuts for better accessibility
document.addEventListener('keydown', (e) => {
    // Escape key to go back (if not on welcome screen)
    if (e.key === 'Escape') {
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen && currentScreen.id !== 'welcome-screen') {
            // Could add back navigation here if desired
        }
    }
});

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', (e) => {
    clickCount++;
    
    // After 10 clicks, show a special message
    if (clickCount === 10) {
        console.log('🎊 You found the hidden easter egg! Your sibling really loves you! 🎊');
    }
});

// Prevent context menu on decorative elements to maintain the magic
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.balloon, .heart, .star').forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        });
    }, 500);
});