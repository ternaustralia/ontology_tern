// Module 3 JavaScript - Ontology

document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for interactive components
    setupExerciseHandlers();
});

function setupExerciseHandlers() {
    // Exercise 1: Ontology components matching
    const checkOntologyBtn = document.querySelector('.check-ontology');
    if (checkOntologyBtn) {
        checkOntologyBtn.addEventListener('click', checkOntologyAnswers);
    }
    
    // Exercise 2: Domain and Range exercise
    const checkDomainRangeBtn = document.querySelector('.check-domain-range');
    if (checkDomainRangeBtn) {
        checkDomainRangeBtn.addEventListener('click', checkDomainRangeAnswers);
    }
    
    // Exercise 3: Thinking mode form
    const thinkingModeForm = document.getElementById('thinking-mode-form');
    if (thinkingModeForm) {
        thinkingModeForm.addEventListener('submit', checkThinkingModeAnswers);
    }
}

function checkOntologyAnswers() {
    const selects = document.querySelectorAll('.ontology-matching select');
    const feedback = document.querySelector('.ontology-feedback');
    const correctAnswers = ['a', 'b', 'c', 'a', 'b']; // Class, Property, Instance, Class, Property
    
    let correct = 0;
    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
            correct++;
        } else {
            select.classList.add('incorrect');
            select.classList.remove('correct');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === correctAnswers.length) {
        feedback.className = 'ontology-feedback mt-2 success';
        feedback.innerHTML = '<p>🎉 Excellent! You correctly identified all the ontology components.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'ontology-feedback mt-2 error';
        feedback.innerHTML = `<p>You got ${correct} out of ${correctAnswers.length} correct. Try again!</p>`;
    }
}

function checkDomainRangeAnswers() {
    const selects = document.querySelectorAll('select[name^="domain"], select[name^="range"]');
    const feedback = document.querySelector('.domain-range-feedback');
    const correctAnswers = ['a', 'b', 'b', 'c', 'b', 'a']; // domain1, range1, domain2, range2, domain3, range3
    
    let correct = 0;
    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
            correct++;
        } else {
            select.classList.add('incorrect');
            select.classList.remove('correct');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === correctAnswers.length) {
        feedback.className = 'domain-range-feedback mt-2 success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand domain and range relationships in ontologies.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'domain-range-feedback mt-2 error';
        feedback.innerHTML = `<p>You got ${correct} out of ${correctAnswers.length} correct. Review the concepts and try again!</p>`;
    }
}

function checkThinkingModeAnswers(e) {
    e.preventDefault();
    
    const correctAnswers = {
        question1: 'b', // Tabular thinking - fixed schema
        question2: 'a', // Ontology thinking - flexible properties
        question3: 'b', // Tabular thinking - adding columns
        question4: 'a', // Ontology thinking - inference
        question5: 'b'  // Tabular thinking - joins
    };
    
    const form = e.target;
    const feedback = document.querySelector('.quiz-feedback');
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let results = [];
    
    // Check each answer
    Object.keys(correctAnswers).forEach(question => {
        const selectedAnswer = form.querySelector(`input[name="${question}"]:checked`);
        const correctAnswer = correctAnswers[question];
        
        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score++;
            results.push(`<p class="correct">✓ Question ${question.slice(-1)}: Correct</p>`);
        } else {
            results.push(`<p class="incorrect">✗ Question ${question.slice(-1)}: Incorrect</p>`);
        }
    });
    
    // Display results
    feedback.style.display = 'block';
    
    if (score === total) {
        feedback.className = 'quiz-feedback mt-4 success';
        feedback.innerHTML = `
            <h3>🎉 Perfect Score!</h3>
            <p>You can clearly distinguish between ontology-based and tabular thinking!</p>
            ${results.join('')}
        `;
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'quiz-feedback mt-4 partial';
        feedback.innerHTML = `
            <h3>Good effort!</h3>
            <p>You scored ${score} out of ${total}. Review the concepts and think about the flexibility differences.</p>
            ${results.join('')}
        `;
    }
}

function showFireworks() {
    const fireworks = document.querySelector('.fireworks');
    fireworks.classList.add('show');
    
    // Hide after a few seconds
    setTimeout(() => {
        fireworks.classList.remove('show');
    }, 3000);
} 