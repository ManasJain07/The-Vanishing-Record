# The Vanishing Record - Database Mystery Game

An interactive web-based mystery game where players investigate a missing database record through SQL-based puzzles.

## 🎮 Game Overview

**Story**: A student record has mysteriously vanished from the college attendance database. No deletion logs exist, and no backup corruption is detected. Players must trace the disappearance through a series of SQL-based clues.

**Objective**: Answer 5 chained SQL questions to uncover the truth behind the vanishing record.

## 🚀 How to Play

1. **Open the Game**: Simply open `index.html` in your web browser
2. **Start Investigation**: Click "BEGIN INVESTIGATION" to start
3. **Answer Questions**: Type your answers in the terminal-style interface
4. **Follow Clues**: Each correct answer reveals a clue for the next question
5. **Solve the Mystery**: Complete all questions to discover the final revelation

## 🎯 Game Features

### Visual Design
- **Terminal-style UI** with dark gray background and green monospace text
- **Animated database icons** that change with each question
- **Glowing SQL keywords** with special highlighting effects
- **Progress tracking** with animated progress bar
- **Confetti celebration** upon completion

### Gameplay Mechanics
- **Chained Questions**: Each answer becomes a clue for the next question
- **Scoring System**: Earn points for correct answers, lose points for incorrect ones
- **Real-time Feedback**: Immediate feedback on answers with visual cues
- **Typewriter Effects**: Questions and clues appear with typing animation
- **Responsive Design**: Works on desktop and mobile devices

### Questions & Answers
1. "What command retrieves data from a table in SQL?" → **SELECT**
2. "SQL command used to delete a record?" → **DELETE**
3. "Which SQL constraint prevents duplicate values?" → **UNIQUE**
4. "What key uniquely identifies each record?" → **PRIMARY KEY**
5. "Common file extension for database backup?" → **.BAK**

### Final Reveal
"The record wasn't deleted — it was trapped in an unmerged .bak file!"

## 🛠️ Technical Details

### Tech Stack
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced styling with animations and responsive design
- **Vanilla JavaScript**: Game logic, animations, and interactivity
- **Google Fonts**: JetBrains Mono for authentic terminal feel

### Key Features
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Cross-browser Compatible**: Works in all modern browsers
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, or animations
- Adjust terminal theme by changing color variables
- Add new animations in the CSS keyframes

### Game Content
- Edit `script.js` to modify questions, answers, or clues
- Change the final reveal message
- Adjust scoring system or add new features

### Visual Effects
- Modify database icons in the `databaseIcons` array
- Add new SQL keywords for highlighting
- Customize confetti colors and effects

## 🚀 Future Enhancements

### Potential Additions
- **Backend Integration**: Flask/Node.js server for score tracking
- **Multiple Difficulty Levels**: Beginner, Intermediate, Advanced
- **More Questions**: Expand the mystery with additional SQL concepts
- **Sound Effects**: Terminal beeps and ambient database sounds
- **Save Progress**: Local storage for game state persistence
- **Leaderboards**: High score tracking and sharing

### Advanced Features
- **Multiplayer Mode**: Collaborative investigation
- **Time Challenges**: Speed-based scoring
- **Hint System**: Progressive hints for difficult questions
- **Achievement System**: Badges for different accomplishments

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Educational Value

This game teaches:
- **SQL Fundamentals**: Basic database commands and concepts
- **Problem Solving**: Logical thinking through chained clues
- **Database Concepts**: Primary keys, constraints, and backup files
- **Terminal Interface**: Command-line style interaction

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute by:
- Adding new questions and scenarios
- Improving the visual design
- Adding new features and animations
- Optimizing performance
- Enhancing accessibility

---

**Happy Investigating!** 🕵️‍♂️💾

