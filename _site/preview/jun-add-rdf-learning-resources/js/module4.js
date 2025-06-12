// Module 4 Interactive Elements - Controlled Vocabularies
document.addEventListener('DOMContentLoaded', function() {
    setupConceptExercise();
    setupCollectionExercise();
    setupObserverVocabularyExercise();
});

function setupConceptExercise() {
    const checkButton = document.getElementById('check-concept-matching');
    if (checkButton) {
        checkButton.addEventListener('click', checkConceptMatching);
    }
    
    // Setup concept relationships exercise
    const checkRelationshipsButton = document.getElementById('check-concept-relationships');
    if (checkRelationshipsButton) {
        checkRelationshipsButton.addEventListener('click', checkConceptRelationships);
    }
    
    // Setup concept scheme exercise
    const checkSchemeButton = document.getElementById('check-concept-scheme');
    if (checkSchemeButton) {
        checkSchemeButton.addEventListener('click', checkConceptScheme);
    }
}

function setupCollectionExercise() {
    const checkButton = document.getElementById('check-collection-builder');
    if (checkButton) {
        checkButton.addEventListener('click', checkCollectionBuilder);
    }
    
    const resetButton = document.getElementById('reset-collection-builder');
    if (resetButton) {
        resetButton.addEventListener('click', resetCollectionBuilder);
    }
    
    // Setup drag and drop functionality
    setupCollectionDragAndDrop();
}

function setupCollectionDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-options .drag-item');
    const dropZone = document.querySelector('.collection-members-box');
    const dragOptionsContainer = document.querySelector('.drag-options');
    
    // Setup drag items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleCollectionDragStart);
        item.addEventListener('dragend', handleCollectionDragEnd);
    });
    
    // Setup drop zone
    if (dropZone) {
        dropZone.addEventListener('dragover', handleCollectionDragOver);
        dropZone.addEventListener('dragenter', handleCollectionDragEnter);
        dropZone.addEventListener('dragleave', handleCollectionDragLeave);
        dropZone.addEventListener('drop', handleCollectionDrop);
    }
    
    // Setup drag options container to accept items being dragged back
    if (dragOptionsContainer) {
        dragOptionsContainer.addEventListener('dragover', handleCollectionDragOver);
        dragOptionsContainer.addEventListener('dragenter', handleDragOptionsEnter);
        dragOptionsContainer.addEventListener('dragleave', handleDragOptionsLeave);
        dragOptionsContainer.addEventListener('drop', handleDragOptionsDrop);
    }
}

function handleCollectionDragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
        value: e.target.textContent,
        type: e.target.getAttribute('data-type')
    }));
    e.target.classList.add('dragging');
}

function handleCollectionDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleCollectionDragOver(e) {
    e.preventDefault();
}

function handleCollectionDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-hover');
}

function handleCollectionDragLeave(e) {
    e.target.classList.remove('drag-hover');
}

function handleCollectionDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-hover');
    
    const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const draggedElement = Array.from(document.querySelectorAll('.drag-item')).find(item => 
        item.textContent === draggedData.value && item.style.display !== 'none'
    );
    
    // Hide the original drag item
    if (draggedElement) {
        draggedElement.style.display = 'none';
    }
    
    // Remove instruction text if it exists
    const instruction = e.target.querySelector('.instruction');
    if (instruction) {
        instruction.remove();
    }
    
    // Add the dropped content
    const droppedItem = document.createElement('div');
    droppedItem.textContent = draggedData.value;
    droppedItem.className = 'collection-item';
    droppedItem.draggable = true;
    droppedItem.setAttribute('data-type', draggedData.type);
    droppedItem.setAttribute('data-value', draggedData.value);
    
    // Add event listeners for dragging back
    droppedItem.addEventListener('dragstart', handleDroppedCollectionItemDragStart);
    droppedItem.addEventListener('dragend', handleDroppedCollectionItemDragEnd);
    
    // Add correct/incorrect styling based on type
    if (draggedData.type === 'freshwater' || draggedData.type === 'both') {
        droppedItem.classList.add('correct-answer');
    } else {
        droppedItem.classList.add('incorrect-answer');
    }
    
    e.target.appendChild(droppedItem);
}

function handleDroppedCollectionItemDragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
        value: e.target.getAttribute('data-value'),
        type: e.target.getAttribute('data-type')
    }));
    e.target.classList.add('dragging');
}

function handleDroppedCollectionItemDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOptionsEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-hover');
}

function handleDragOptionsLeave(e) {
    e.target.classList.remove('drag-hover');
}

function handleDragOptionsDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-hover');
    
    const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const draggedElement = document.querySelector(`.collection-item[data-value="${draggedData.value}"]`);
    
    if (draggedElement) {
        // Remove the dropped item from the collection
        draggedElement.remove();
        
        // Show the original drag item again
        const originalDragItem = Array.from(document.querySelectorAll('.drag-item')).find(item => 
            item.textContent === draggedData.value
        );
        if (originalDragItem) {
            originalDragItem.style.display = 'block';
        }
        
        // Add instruction text back if collection is empty
        const collectionBox = document.querySelector('.collection-members-box');
        if (collectionBox && collectionBox.children.length === 0) {
            const instruction = document.createElement('p');
            instruction.className = 'instruction';
            instruction.textContent = 'Drop freshwater fish concepts here';
            collectionBox.appendChild(instruction);
        }
    }
}

function resetCollectionBuilder() {
    const collectionBox = document.querySelector('.collection-members-box');
    const dragItems = document.querySelectorAll('.drag-options .drag-item');
    const dragOptionsContainer = document.querySelector('.drag-options');
    
    // Clear collection box
    if (collectionBox) {
        collectionBox.innerHTML = '<p class="instruction">Drop freshwater fish concepts here</p>';
        collectionBox.classList.remove('drag-hover');
    }
    
    // Show all original drag items
    dragItems.forEach(item => {
        item.style.display = 'block';
    });
    
    // Clear drag options container hover state
    if (dragOptionsContainer) {
        dragOptionsContainer.classList.remove('drag-hover');
    }
    
    const feedback = document.getElementById('collection-builder-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

function setupObserverVocabularyExercise() {
    // Set up option buttons
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentItem = this.closest('.matching-item');
            const buttons = parentItem.querySelectorAll('.option-button');
            const selectedValue = parentItem.querySelector('.selected-value');
            
            // Remove selected class from all buttons in this item
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Update selected value display
            selectedValue.textContent = this.textContent;
            selectedValue.setAttribute('data-value', this.getAttribute('data-value'));
        });
    });
    
    const checkButton = document.getElementById('check-observer-vocabulary');
    if (checkButton) {
        checkButton.addEventListener('click', checkObserverVocabulary);
    }
}

function checkConceptRelationships() {
    const selects = document.querySelectorAll('#concept-relationship-exercise select');
    const feedback = document.getElementById('concept-relationship-feedback');
    
    let correct = 0;
    let total = selects.length;
    
    selects.forEach(select => {
        const correctAnswer = select.getAttribute('data-correct');
        if (select.value === correctAnswer) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === total) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You correctly identified all SKOS relationship types.</p>';
        
        // Show celebration fireworks if available
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${total} correct. Review the SKOS relationships and try again!</p>`;
    }
}

function checkConceptScheme() {
    const checkboxes = document.querySelectorAll('#concept-scheme-exercise input[type="checkbox"]');
    const feedback = document.getElementById('concept-scheme-feedback');
    
    let correct = 0;
    let total = checkboxes.length;
    
    checkboxes.forEach(checkbox => {
        const isCorrect = checkbox.getAttribute('data-correct') === 'true';
        const isChecked = checkbox.checked;
        const exerciseItem = checkbox.closest('.exercise-item');
        
        // Correct if: (should be true AND is checked) OR (should be false AND is not checked)
        if ((isCorrect && isChecked) || (!isCorrect && !isChecked)) {
            exerciseItem.classList.add('correct-answer');
            exerciseItem.classList.remove('incorrect-answer');
            correct++;
        } else {
            exerciseItem.classList.add('incorrect-answer');
            exerciseItem.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === total) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You have a solid understanding of SKOS ConceptSchemes.</p>';
        
        // Show celebration fireworks if available
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${total} correct. Review the ConceptScheme concepts and try again!</p>`;
    }
}

function checkConceptMatching() {
    const selects = document.querySelectorAll('#concept-matching-exercise select');
    const feedback = document.getElementById('concept-matching-feedback');
    const correctAnswers = ['concept', 'scheme', 'collection']; // Example correct answers
    
    let correct = 0;
    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            select.classList.add('correct-answer');
            select.classList.remove('incorrect-answer');
            correct++;
        } else {
            select.classList.add('incorrect-answer');
            select.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === correctAnswers.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand the different SKOS components.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${correctAnswers.length} correct. Review the concepts and try again!</p>`;
    }
}

function checkCollectionBuilder() {
    const feedback = document.getElementById('collection-builder-feedback');
    const collectionItems = document.querySelectorAll('.collection-members-box .collection-item');
    
    let correct = 0;
    let incorrect = 0;
    
    collectionItems.forEach(item => {
        const type = item.getAttribute('data-type');
        if (type === 'freshwater' || type === 'both') {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    feedback.style.display = 'block';
    
    if (collectionItems.length === 0) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please add some concepts to the collection first.</p>';
    } else if (incorrect === 0 && correct >= 3) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You correctly built a freshwater fish collection with only appropriate concepts.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else if (incorrect > 0) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You have ${incorrect} incorrect item(s) in your collection. Only freshwater fish should be included!</p>`;
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Add more freshwater fish concepts to complete the collection.</p>';
    }
}

function checkObserverVocabulary() {
    const matchingItems = document.querySelectorAll('#observer-vocabulary-exercise .matching-item');
    const feedback = document.getElementById('observer-vocabulary-feedback');
    const correctAnswers = ['human', 'weather', 'satellite', 'machine']; // Correct answers for each question
    
    let correct = 0;
    matchingItems.forEach((item, index) => {
        const selectedValue = item.querySelector('.selected-value');
        const value = selectedValue.getAttribute('data-value');
        
        if (value === correctAnswers[index]) {
            item.classList.add('correct-answer');
            item.classList.remove('incorrect-answer');
            correct++;
        } else {
            item.classList.add('incorrect-answer');
            item.classList.remove('correct-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (correct === correctAnswers.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You correctly classified all the observer types.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${correctAnswers.length} correct. Consider the nature of each device!</p>`;
    }
} 