document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote-display');
    const typingArea = document.getElementById('typing-area');
    const caret = document.getElementById('caret');
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    const timeSelect = document.getElementById('time-select');
    const modeSelect = document.getElementById('mode-select');
    const themeSelect = document.getElementById('theme-select');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const errorsDisplay = document.getElementById('errors');
    const customQuoteInput = document.getElementById('custom-quote');
    const addQuoteBtn = document.getElementById('add-quote-btn');

    let quotes = [];
    let currentQuote = '';
    let timeLeft = parseInt(timeSelect.value);
    let timer = null;
    let errors = 0;
    let typedChars = 0;
    let isTyping = false;

    // Fetch quotes
    fetch('/quotes')
        .then(response => response.json())
        .then(data => {
            quotes = data;
            loadNewQuote();
        });

    // Load new quote or random words
    function loadNewQuote() {
        currentQuote = modeSelect.value === 'practice' ? quotes[Math.floor(Math.random() * quotes.length)] : generateRandomWords(20);
        quoteDisplay.innerHTML = currentQuote.split('').map(char => `<span>${char === ' ' ? ' ' : char}</span>`).join('');
        typingArea.value = '';
        errors = 0;
        typedChars = 0;
        caret.style.display = 'none';
        updateStats();
        updateCaretPosition(0);
    }

    // Generate random words for Free Type mode
    function generateRandomWords(count) {
        const words = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'hello', 'world', 'code', 'test', 'speed', 'type', 'learn', 'data', 'input', 'write', 'fast', 'skill'];
        let result = '';
        for (let i = 0; i < count; i++) {
            result += words[Math.floor(Math.random() * words.length)] + ' ';
        }
        return result.trim();
    }

    // Update caret position
    function updateCaretPosition(index) {
        const quoteChars = quoteDisplay.querySelectorAll('span');
        if (index < quoteChars.length) {
            const char = quoteChars[index];
            const rect = char.getBoundingClientRect();
            const containerRect = quoteDisplay.getBoundingClientRect();
            caret.style.left = `${rect.left - containerRect.left}px`;
            caret.style.top = `${rect.top - containerRect.top}px`;
            caret.style.height = `${rect.height}px`;
            caret.style.display = 'block';
        } else {
            caret.style.display = 'none';
        }
    }

    // Start test
    startBtn.addEventListener('click', () => {
        if (timer) clearInterval(timer);
        timeLeft = parseInt(timeSelect.value);
        timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
        typingArea.disabled = false;
        typingArea.focus();
        errors = 0;
        typedChars = 0;
        isTyping = false;
        loadNewQuote();
        startBtn.disabled = true;

        if (modeSelect.value !== 'free') {
            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    typingArea.disabled = true;
                    startBtn.disabled = false;
                    caret.style.display = 'none';
                    saveStats();
                    updateStats();
                }
            }, 1000);
        }
    });

    // Typing logic
    typingArea.addEventListener('input', () => {
        if (!isTyping) {
            isTyping = true;
            caret.style.display = 'block';
        }
        typedChars++;
        const typedText = typingArea.value;
        const quoteChars = quoteDisplay.querySelectorAll('span');
        errors = 0;

        quoteChars.forEach((char, i) => {
            if (i < typedText.length) {
                char.className = typedText[i] === currentQuote[i] ? 'correct' : 'incorrect';
                if (typedText[i] !== currentQuote[i]) errors++;
            } else {
                char.className = '';
            }
        });

        updateCaretPosition(typedText.length);

        updateStats();
        if (typedText === currentQuote && modeSelect.value !== 'free') {
            clearInterval(timer);
            typingArea.disabled = true;
            startBtn.disabled = false;
            caret.style.display = 'none';
            saveStats();
            loadNewQuote();
        }
    });

    // Update stats
    function updateStats() {
        const words = typedChars / 5;
        const elapsed = parseInt(timeSelect.value) - timeLeft;
        const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
        const accuracy = typedChars > 0 ? Math.round(((typedChars - errors) / typedChars) * 100) : 0;
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = `${accuracy}%`;
        errorsDisplay.textContent = errors;
    }

    // Save stats
    function saveStats() {
        const words = typedChars / 5;
        const elapsed = parseInt(timeSelect.value) - timeLeft;
        const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
        const accuracy = typedChars > 0 ? Math.round(((typedChars - errors) / typedChars) * 100) : 0;
        fetch('/save_stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: 'guest', // Replace with user ID if authentication added
                wpm,
                accuracy,
                errors,
                timestamp: new Date().toISOString()
            })
        });
    }

    // Theme switching
    themeSelect.addEventListener('change', () => {
        document.body.className = `theme-${themeSelect.value}`;
    });

    // Add custom quote
    addQuoteBtn.addEventListener('click', () => {
        const customQuote = customQuoteInput.value.trim();
        if (customQuote) {
            fetch('/add_quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quote: customQuote })
            }).then(() => {
                quotes.push(customQuote);
                customQuoteInput.value = '';
                if (modeSelect.value === 'practice') loadNewQuote();
            });
        }
    });

    // Handle mode change
    modeSelect.addEventListener('change', () => {
        loadNewQuote();
        if (modeSelect.value === 'free') {
            clearInterval(timer);
            timerDisplay.textContent = 'Free';
            startBtn.disabled = false;
            typingArea.disabled = false;
            caret.style.display = 'block';
        }
    });
});