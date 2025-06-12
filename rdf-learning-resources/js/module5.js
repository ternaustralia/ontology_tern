// Module 5 Interactive Elements - RDF Serialization Formats
document.addEventListener('DOMContentLoaded', function() {
    setupFormatQuiz();
    setupFormatIdentification();
    setupRdfXmlComponents();
    setupTurtleSyntax();
    setupNTripleParser();
    setupJsonLdKeywords();
});

function setupFormatQuiz() {
    const checkButton = document.getElementById('check-format-quiz');
    if (checkButton) {
        checkButton.addEventListener('click', checkFormatQuiz);
    }
}

function setupFormatIdentification() {
    const checkButton = document.getElementById('check-format-identification');
    if (checkButton) {
        checkButton.addEventListener('click', checkFormatIdentification);
    }
}

function setupRdfXmlComponents() {
    const checkButton = document.getElementById('check-rdf-xml-components');
    if (checkButton) {
        checkButton.addEventListener('click', checkRdfXmlComponents);
    }
}

function setupTurtleSyntax() {
    const checkButton = document.getElementById('check-turtle-syntax');
    const resetButton = document.getElementById('reset-turtle-syntax');
    
    if (checkButton) {
        checkButton.addEventListener('click', checkTurtleSyntax);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetTurtleSyntax);
    }
    
    // Setup drag and drop functionality
    setupDragAndDrop();
}

function setupNTripleParser() {
    const checkButton = document.getElementById('check-n-triple-parser');
    if (checkButton) {
        checkButton.addEventListener('click', checkNTripleParser);
    }
}

function setupJsonLdKeywords() {
    const checkButton = document.getElementById('check-jsonld-keywords');
    if (checkButton) {
        checkButton.addEventListener('click', checkJsonLdKeywords);
    }
}

function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('#turtle-syntax .drag-item');
    const dropTargets = document.querySelectorAll('#turtle-syntax .drop-target');
    
    // Add drag event listeners to drag items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Add drop event listeners to drop targets
    dropTargets.forEach(target => {
        target.addEventListener('dragover', handleDragOver);
        target.addEventListener('dragenter', handleDragEnter);
        target.addEventListener('dragleave', handleDragLeave);
        target.addEventListener('drop', handleDrop);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedElement = null;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedElement && draggedElement !== this) {
        // Check if this drop target accepts this type of drag item
        const dragType = draggedElement.getAttribute('data-type');
        const acceptsType = this.getAttribute('data-accepts');
        
        if (dragType === acceptsType) {
            // Clear any existing content in the drop target
            this.innerHTML = '';
            // Move the dragged element to the drop target
            this.appendChild(draggedElement.cloneNode(true));
            // Remove the original dragged element from its current position
            draggedElement.parentNode.removeChild(draggedElement);
        }
    }
    
    return false;
}

function checkTurtleSyntax() {
    const dropTargets = document.querySelectorAll('#turtle-syntax .drop-target');
    const feedback = document.getElementById('turtle-syntax-feedback');
    
    let correct = 0;
    let total = dropTargets.length;
    
    dropTargets.forEach(target => {
        const acceptsType = target.getAttribute('data-accepts');
        const droppedItem = target.querySelector('.drag-item');
        
        if (droppedItem) {
            const dragType = droppedItem.getAttribute('data-type');
            if (dragType === acceptsType) {
                target.classList.add('correct-drop');
                target.classList.remove('incorrect-drop');
                correct++;
            } else {
                target.classList.add('incorrect-drop');
                target.classList.remove('correct-drop');
            }
        } else {
            target.classList.add('incorrect-drop');
            target.classList.remove('correct-drop');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === total) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand Turtle syntax features and their purposes.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${total} correct. Review the Turtle syntax features and try again!</p>`;
    }
}

function resetTurtleSyntax() {
    const dropTargets = document.querySelectorAll('#turtle-syntax .drop-target');
    const dragOptions = document.querySelector('#turtle-syntax .drag-options');
    const feedback = document.getElementById('turtle-syntax-feedback');
    
    // Move all items back to the drag options area
    dropTargets.forEach(target => {
        const droppedItem = target.querySelector('.drag-item');
        if (droppedItem) {
            dragOptions.appendChild(droppedItem);
        }
        // Clear visual feedback
        target.classList.remove('correct-drop', 'incorrect-drop', 'drag-over');
    });
    
    // Hide feedback
    feedback.style.display = 'none';
    
    // Re-setup drag and drop after reset
    setupDragAndDrop();
}

function checkFormatQuiz() {
    const selects = document.querySelectorAll('#format-quiz select');
    const feedback = document.getElementById('format-quiz-feedback');
    const correctAnswers = ['turtle', 'n-triples', 'json-ld', 'rdf-xml']; // Example correct answers
    
    let correct = 0;
    selects.forEach((select, index) => {
        const correctValue = select.getAttribute('data-correct');
        if (select.value === correctValue) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === selects.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You can identify different RDF serialization formats.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Look at the syntax patterns more carefully!</p>`;
    }
}

function checkFormatIdentification() {
    const selects = document.querySelectorAll('#format-identification select');
    const feedback = document.getElementById('format-identification-feedback');
    
    let correct = 0;
    selects.forEach((select) => {
        const correctValue = select.getAttribute('data-correct');
        if (select.value === correctValue) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === selects.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You can identify RDF formats by their syntax.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Look at the syntax differences more carefully!</p>`;
    }
}

function checkRdfXmlComponents() {
    const selects = document.querySelectorAll('#rdf-xml-components select');
    const feedback = document.getElementById('rdf-xml-components-feedback');
    
    let correct = 0;
    selects.forEach((select) => {
        const correctValue = select.getAttribute('data-correct');
        if (select.value === correctValue) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === selects.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand RDF/XML components and their functions.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review the RDF/XML syntax components and try again!</p>`;
    }
}

function checkNTripleParser() {
    const subjectInput = document.getElementById('n-triple-subject');
    const predicateInput = document.getElementById('n-triple-predicate');
    const objectInput = document.getElementById('n-triple-object');
    const feedback = document.getElementById('n-triple-parser-feedback');
    
    const inputs = [subjectInput, predicateInput, objectInput];
    let correct = 0;
    
    inputs.forEach(input => {
        const userAnswer = input.value.trim();
        const correctAnswer = input.getAttribute('data-correct');
        
        if (userAnswer === correctAnswer) {
            input.classList.add('correct-answer');
            input.classList.remove('incorrect-answer');
            correct++;
        } else {
            input.classList.add('incorrect-answer');
            input.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === inputs.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You correctly identified all parts of the N-Triple statement.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${inputs.length} correct. Remember to enter the complete URI without the angle brackets (&lt; &gt;).</p>`;
    }
}

function checkJsonLdKeywords() {
    const selects = document.querySelectorAll('#jsonld-keywords select');
    const feedback = document.getElementById('jsonld-keywords-feedback');
    
    let correct = 0;
    selects.forEach((select) => {
        const correctValue = select.getAttribute('data-correct');
        if (select.value === correctValue) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === selects.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You understand the key JSON-LD keywords and their purposes.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review the JSON-LD keywords and their functions!</p>`;
    }
} 