// Game state management
let currentQuestion = 0;
let score = 0;
let cluesFound = 0;
let gameStarted = false;
let gameStartTime = null;
let timerInterval = null;
let totalTime = 0;

// Database icons for animation
const databaseIcons = ['🗄️', '💾', '📊', '🔍', '⚡'];

// Questions and answers with chained clues
const questions = [
    {
        question: "What command retrieves data from a table in SQL?",
        answer: "SELECT",
        clue: "This command is the foundation of data retrieval...",
        nextClue: "Now that you know how to retrieve data, what command removes it?"
    },
    {
        question: "SQL command used to delete a record?",
        answer: "DELETE",
        clue: "You've found the deletion command, but something's not right...",
        nextClue: "If it wasn't deleted, what constraint might prevent duplicates?"
    },
    {
        question: "Which SQL constraint prevents duplicate values?",
        answer: "UNIQUE",
        clue: "Unique constraints prevent duplicates, but that's not the issue...",
        nextClue: "What key uniquely identifies each record in a table?"
    },
    {
        question: "What key uniquely identifies each record?",
        answer: "PRIMARY KEY",
        clue: "Primary keys ensure uniqueness, but the record still vanished...",
        nextClue: "What's the common file extension for database backups?"
    },
    {
        question: "Common file extension for database backup?",
        answer: ".BAK",
        clue: "Backup files... that's interesting. The plot thickens!",
        nextClue: "You've gathered all the clues. Time for the final revelation!"
    }
];

// Initialize game
function startGame() {
    gameStarted = true;
    gameStartTime = Date.now();
    
    const introScreen = document.getElementById('introScreen');
    const gameScreen = document.getElementById('gameScreen');
    const answerInput = document.getElementById('answerInput');
    
    if (introScreen) introScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'block';
    if (answerInput) answerInput.focus();
    
    // Start the timer
    startTimer();
    
    // Start the first question (with typewriter effect)
    showQuestion();
}

// Display current question with animations
function showQuestion() {
    const questionData = questions[currentQuestion];
    const questionElement = document.getElementById('questionText');
    const clueElement = document.getElementById('clueText');
    const databaseIcon = document.getElementById('databaseIcon');
    
    // Update progress
    updateProgress();
    
    // Animate database icon
    animateDatabaseIcon();
    
    // Clear previous content
    if (questionElement) questionElement.innerHTML = '';
    if (clueElement) clueElement.innerHTML = '';
    
    // Show clue from previous question if available
    if (currentQuestion > 0 && clueElement) {
        const previousClue = questions[currentQuestion - 1].nextClue;
        typeWriter(clueElement, previousClue, 50);
    }
    
    // Show current question after a delay
    setTimeout(() => {
        if (questionElement) {
            typeWriter(questionElement, questionData.question);
        }
    }, currentQuestion > 0 ? 2000 : 0);
    
    // Clear input and feedback
    const answerInput = document.getElementById('answerInput');
    const feedback = document.getElementById('feedback');
    if (answerInput) answerInput.value = '';
    if (feedback) feedback.style.display = 'none';
}

// Typewriter effect for text
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add SQL keyword highlighting after typing is complete
            highlightSQLKeywords(element);
        }
    }
    
    type();
}

// Highlight SQL keywords with glow effect
function highlightSQLKeywords(element) {
    if (!element) return;
    
    const sqlKeywords = ['SELECT', 'DELETE', 'UNIQUE', 'PRIMARY KEY', 'INSERT', 'UPDATE', 'FROM', 'WHERE', 'TABLE', 'DATABASE'];
    let content = element.innerHTML;
    
    sqlKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        content = content.replace(regex, `<span class="sql-keyword">${keyword}</span>`);
    });
    
    element.innerHTML = content;
}

// Animate database icon
function animateDatabaseIcon() {
    const iconElement = document.getElementById('databaseIcon');
    if (!iconElement) return;
    
    const iconIndex = currentQuestion % databaseIcons.length;
    
    // Fade out current icon
    iconElement.style.opacity = '0';
    
    setTimeout(() => {
        iconElement.textContent = databaseIcons[iconIndex];
        iconElement.style.opacity = '1';
        
        // Add pulse animation
        iconElement.style.animation = 'pulse 1s ease-in-out';
    }, 300);
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    if (progressText) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    }
}

// Submit answer
function submitAnswer() {
    const answerInput = document.getElementById('answerInput');
    const userAnswer = answerInput ? answerInput.value.trim().toUpperCase() : '';
    const correctAnswer = questions[currentQuestion].answer.toUpperCase();
    const feedbackElement = document.getElementById('feedback');
    
    if (!userAnswer) {
        showFeedback('Please enter an answer!', 'incorrect');
        return;
    }
    
    if (userAnswer === correctAnswer) {
        score += 100;
        cluesFound++;
        showFeedback(`✓ Correct! ${questions[currentQuestion].clue}`, 'correct');
        
        // Update score display with null checks
        const scoreElement = document.getElementById('score');
        const cluesElement = document.getElementById('cluesFound');
        if (scoreElement) scoreElement.textContent = score;
        if (cluesElement) cluesElement.textContent = cluesFound;
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showFinalReveal();
            }
        }, 2000);
        
    } else {
        showFeedback('Incorrect.', 'fail');
        
        // Update score display
        const scoreElement = document.getElementById('score');
        if (scoreElement) scoreElement.textContent = score;
        
        // Clear input for retry
        if (answerInput) answerInput.value = '';
    }
}

// Show feedback message
function showFeedback(message, type) {
    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
        feedbackElement.textContent = message;
        feedbackElement.className = `feedback ${type}`;
        feedbackElement.style.display = 'block';
        
        // Add animation
        feedbackElement.style.animation = 'fadeIn 0.5s ease-in';
    }
}

// Show final reveal
function showFinalReveal() {
    // Stop the timer
    stopTimer();
    
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('finalReveal').style.display = 'block';
    
    const finalScoreElement = document.getElementById('finalScore');
    const finalTimeElement = document.getElementById('finalTime');
    
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }
    if (finalTimeElement) {
        finalTimeElement.textContent = formatTime(totalTime);
    }
    
    // Add celebration effect
    createConfetti();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#00ff00', '#ff6b6b', '#ffd700', '#00bfff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Restart game
function restartGame() {
    currentQuestion = 0;
    score = 0;
    cluesFound = 0;
    gameStarted = false;
    gameStartTime = null;
    totalTime = 0;
    
    // Stop timer if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    document.getElementById('finalReveal').style.display = 'none';
    document.getElementById('introScreen').style.display = 'block';
    
    // Reset all displays with null checks
    const scoreElement = document.getElementById('score');
    const cluesElement = document.getElementById('cluesFound');
    const timerElement = document.getElementById('timer');
    const progressElement = document.getElementById('progressFill');
    
    if (scoreElement) scoreElement.textContent = '0';
    if (cluesElement) cluesElement.textContent = '0';
    if (timerElement) timerElement.textContent = '00:00';
    if (progressElement) progressElement.style.width = '0%';
}

// Handle Enter key press
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && gameStarted) {
        submitAnswer();
    }
});

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some terminal-style effects
document.addEventListener('DOMContentLoaded', function() {
    // Add terminal cursor blinking effect
    const input = document.getElementById('answerInput');
    if (input) {
        input.addEventListener('focus', function() {
            this.style.borderLeft = '2px solid #00ff00';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderLeft = 'none';
        });
    }
    
    // Add some random terminal-style background effects
    createTerminalEffects();
    
    // Initialize timer display
    document.getElementById('timer').textContent = '00:00';
});

// Create terminal background effects
function createTerminalEffects() {
    const terminalBody = document.querySelector('.terminal-body');
    
    // Check if terminal body exists before adding particles
    if (terminalBody) {
        // Add some floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${5 + Math.random() * 10}s infinite linear`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            terminalBody.appendChild(particle);
        }
    }
}

// Add CSS for floating particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Timer functions
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        if (gameStartTime) {
            totalTime = Date.now() - gameStartTime;
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                timerElement.textContent = formatTime(totalTime);
            }
        }
    }, 100); // Update every 100ms for smooth display
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

