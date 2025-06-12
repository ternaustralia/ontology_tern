// Module 2 Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    setupInteractiveExercise();
    setupStructureAdvantagesForm();
});

function setupInteractiveExercise() {
    const checkButton = document.querySelector('.check-answer');
    if (checkButton) {
        checkButton.addEventListener('click', checkConversionAnswers);
    }
}

function setupStructureAdvantagesForm() {
    const form = document.getElementById('structure-advantages-form');
    if (form) {
        form.addEventListener('submit', checkStructureAnswers);
    }
}

function checkConversionAnswers() {
    const select1 = document.getElementById('table-element-1');
    const select2 = document.getElementById('table-element-2');
    const select3 = document.getElementById('table-element-3');
    const feedback = document.querySelector('.conversion-matching .feedback');
    
    if (!select1 || !select2 || !select3 || !feedback) return;
    
    const answers = [select1.value, select2.value, select3.value];
    const correctAnswers = ['a', 'b', 'c'];
    
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === correctAnswers[i]) {
            correct++;
        }
    }
    
    feedback.style.display = 'block';
    
    if (correct === correctAnswers.length) {
        feedback.className = 'feedback mt-2 success';
        feedback.innerHTML = '<p>🎉 Excellent! You correctly identified how tabular data maps to RDF components.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback mt-2 error';
        feedback.innerHTML = `<p>You got ${correct} out of ${correctAnswers.length} correct. Try again!</p>`;
    }
}

function checkStructureAnswers(e) {
    e.preventDefault();
    
    const correctAnswers = {
        question1: 'b', // RDF better for scientific data integration
        question2: 'a', // Tabular better for consistent metrics
        question3: 'b', // RDF better for knowledge bases
        question4: 'a'  // Tabular better for simple contact lists
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
            <p>You have a great understanding of when to use RDF vs tabular data!</p>
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
            <p>You scored ${score} out of ${total}. Review the material and consider each use case carefully.</p>
            ${results.join('')}
        `;
    }
} 