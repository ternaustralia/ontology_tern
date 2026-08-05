// Module 1 Interactive Exercises
document.addEventListener('DOMContentLoaded', function() {
    // Set up drag and drop functionality
    setupDragAndDrop();
    
    // Set up quiz functionality
    setupQuiz();
});

// Set up drag and drop functionality
function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropTargets = document.querySelectorAll('.drag-target');
    const dragContainer = document.querySelector('.drag-items');
    
    if (!dragItems.length || !dropTargets.length) return;
    
    // Add event listeners for drag and drop
    setupDragItemEventListeners(dragItems);
    
    dropTargets.forEach(target => {
        target.addEventListener('dragover', handleDragOver);
        target.addEventListener('dragenter', handleDragEnter);
        target.addEventListener('dragleave', handleDragLeave);
        target.addEventListener('drop', handleDrop);
    });
    
    // Make the drag container a valid drop target for returning items
    if (dragContainer) {
        dragContainer.addEventListener('dragover', handleDragOver);
        dragContainer.addEventListener('dragenter', handleDragEnter);
        dragContainer.addEventListener('dragleave', handleDragLeave);
        dragContainer.addEventListener('drop', handleReturnToShelf);
    }
    
    // Set up check answer button
    const checkAnswerBtn = document.querySelector('.check-answer');
    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', checkDragDropAnswers);
    }
    
    // Add reset button
    const dragExerciseContainer = document.querySelector('.drag-container');
    if (dragExerciseContainer) {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Exercise';
        resetButton.className = 'reset-button mt-3';
        resetButton.addEventListener('click', resetDragExercise);
        dragExerciseContainer.appendChild(resetButton);
    }
}

// Helper function to set up drag item event listeners
function setupDragItemEventListeners(items) {
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        
        // Touch support
        item.addEventListener('touchstart', handleTouchStart);
        item.addEventListener('touchmove', handleTouchMove);
        item.addEventListener('touchend', handleTouchEnd);
        
        // Double click to return to shelf
        item.addEventListener('dblclick', returnToShelf);
    });
}

// Reset the drag and drop exercise
function resetDragExercise() {
    // Show all original items in the shelf
    const dragItems = document.querySelectorAll('.drag-items .drag-item');
    dragItems.forEach(item => {
        item.style.display = '';
    });
    
    // Clear all drop targets
    const dropTargets = document.querySelectorAll('.drag-target');
    dropTargets.forEach(target => {
        const targetType = target.classList.contains('subject') ? 'Subject' : 
                          target.classList.contains('predicate') ? 'Predicate' : 'Object';
        target.innerHTML = `<p>${targetType}<br>(Drop here)</p>`;
    });
    
    // Clear feedback
    const feedback = document.querySelector('.drag-container .feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

// Drag and Drop event handlers
let draggedItem = null;
let touchTarget = null;
let dragSourceTarget = null;

function handleDragStart(e) {
    e.stopPropagation();
    draggedItem = this;
    
    // Store the parent if it's a drop target (for returning items)
    if (this.parentElement.classList.contains('drag-target')) {
        dragSourceTarget = this.parentElement;
    } else {
        dragSourceTarget = null;
    }
    
    // Set the drag image and data
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.getAttribute('data-value'));
    
    setTimeout(() => this.style.opacity = '0.4', 0);
}

function handleDragEnd(e) {
    e.stopPropagation();
    this.style.opacity = '1';
    draggedItem = null;
    
    document.querySelectorAll('.drag-target, .drag-items').forEach(target => {
        target.classList.remove('highlight');
    });
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem) return false;
    
    const target = e.currentTarget;
    target.classList.remove('highlight');
    
    // Clear the current content
    target.innerHTML = '';
    
    // If the item came from another drop target, restore that target's placeholder
    if (dragSourceTarget && dragSourceTarget !== target) {
        const targetType = dragSourceTarget.classList.contains('subject') ? 'Subject' :
                          dragSourceTarget.classList.contains('predicate') ? 'Predicate' : 'Object';
        dragSourceTarget.innerHTML = `<p>${targetType}<br>(Drop here)</p>`;
    }
    
    // Clone the dragged item and add it to the target
    const clonedItem = draggedItem.cloneNode(true);
    target.appendChild(clonedItem);
    
    // Hide the original item in the shelf if it came from there
    if (!dragSourceTarget) {
        draggedItem.style.display = 'none';
    }
    
    // Set up event listeners for the cloned item
    setupDragItemEventListeners([clonedItem]);
    
    return false;
}

function handleReturnToShelf(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem) return false;
    
    const dragItems = e.currentTarget;
    dragItems.classList.remove('highlight');
    
    // If the item came from a drop target, restore the placeholder
    if (dragSourceTarget) {
        const targetType = dragSourceTarget.classList.contains('subject') ? 'Subject' :
                          dragSourceTarget.classList.contains('predicate') ? 'Predicate' : 'Object';
        dragSourceTarget.innerHTML = `<p>${targetType}<br>(Drop here)</p>`;
        
        // Show the original item in shelf if it exists
        const originalValue = draggedItem.getAttribute('data-value');
        const originalItem = document.querySelector(`.drag-items .drag-item[data-value="${originalValue}"]`);
        if (originalItem) {
            originalItem.style.display = '';
        }
        
        // Remove the cloned item
        draggedItem.remove();
    }
    
    return false;
}

function returnToShelf(e) {
    if (!this.parentElement.classList.contains('drag-target')) return;
    
    const originalValue = this.getAttribute('data-value');
    const originalItem = document.querySelector(`.drag-items .drag-item[data-value="${originalValue}"]`);
    
    if (originalItem) {
        originalItem.style.display = '';
    }
    
    // Restore placeholder
    const target = this.parentElement;
    const targetType = target.classList.contains('subject') ? 'Subject' :
                      target.classList.contains('predicate') ? 'Predicate' : 'Object';
    target.innerHTML = `<p>${targetType}<br>(Drop here)</p>`;
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    this.classList.add('highlight');
}

function handleDragLeave(e) {
    this.classList.remove('highlight');
}

function handleTouchStart(e) {
    touchTarget = this;
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!touchTarget) return;
    
    const touch = e.touches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Remove previous highlights
    document.querySelectorAll('.drag-target, .drag-items').forEach(target => {
        target.classList.remove('highlight');
    });
    
    // Highlight current target
    if (elementBelow && (elementBelow.classList.contains('drag-target') || 
                        elementBelow.classList.contains('drag-items') ||
                        elementBelow.closest('.drag-target') ||
                        elementBelow.closest('.drag-items'))) {
        const target = elementBelow.classList.contains('drag-target') ? elementBelow :
                      elementBelow.classList.contains('drag-items') ? elementBelow :
                      elementBelow.closest('.drag-target') || elementBelow.closest('.drag-items');
        target.classList.add('highlight');
    }
}

function handleTouchEnd(e) {
    if (!touchTarget) return;
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Remove highlights
    document.querySelectorAll('.drag-target, .drag-items').forEach(target => {
        target.classList.remove('highlight');
    });
    
    if (elementBelow) {
        let target = null;
        
        if (elementBelow.classList.contains('drag-target')) {
            target = elementBelow;
        } else if (elementBelow.classList.contains('drag-items')) {
            target = elementBelow;
        } else if (elementBelow.closest('.drag-target')) {
            target = elementBelow.closest('.drag-target');
        } else if (elementBelow.closest('.drag-items')) {
            target = elementBelow.closest('.drag-items');
        }
        
        if (target) {
            // Create a fake event object
            const fakeEvent = {
                preventDefault: () => {},
                stopPropagation: () => {},
                currentTarget: target
            };
            
            // Store the source if it's from a drop target
            if (touchTarget.parentElement.classList.contains('drag-target')) {
                dragSourceTarget = touchTarget.parentElement;
            } else {
                dragSourceTarget = null;
            }
            
            draggedItem = touchTarget;
            
            if (target.classList.contains('drag-items')) {
                handleReturnToShelf(fakeEvent);
            } else {
                handleDrop(fakeEvent);
            }
        }
    }
    
    touchTarget = null;
    draggedItem = null;
    dragSourceTarget = null;
}

function checkDragDropAnswers() {
    const targets = document.querySelectorAll('.drag-target');
    const feedback = document.querySelector('.drag-container .feedback');
    let correct = 0;
    let total = targets.length;
    
    targets.forEach(target => {
        const expected = target.getAttribute('data-expects');
        const item = target.querySelector('.drag-item');
        
        if (item && item.getAttribute('data-value') === expected) {
            target.classList.add('correct');
            target.classList.remove('incorrect');
            correct++;
        } else {
            target.classList.add('incorrect');
            target.classList.remove('correct');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === total) {
        feedback.className = 'feedback mt-2 success';
        feedback.innerHTML = '<p>🎉 Excellent work! You\'ve correctly formed the RDF triple.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback mt-2 error';
        feedback.innerHTML = `<p>Not quite right. You got ${correct} out of ${total} correct. Try again!</p>`;
    }
}

// Set up quiz functionality
function setupQuiz() {
    const quizForm = document.getElementById('rdf-quiz-form');
    if (!quizForm) return;
    
    quizForm.addEventListener('submit', checkQuizAnswers);
}

function checkQuizAnswers(e) {
    e.preventDefault();
    
    const correctAnswers = {
        question1: 'b',
        question2: 'b',
        question3: 'b',
        question4: 'c',
        question5: 'b'
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
            <p>You answered all ${total} questions correctly!</p>
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
            <p>You scored ${score} out of ${total}. Review the material and try again if you'd like.</p>
            ${results.join('')}
        `;
    }
} 