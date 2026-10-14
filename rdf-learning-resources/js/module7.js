// Module 7 Interactive Elements - SHACL Shapes
document.addEventListener('DOMContentLoaded', function() {
    setupShaclComponents();
    setupNodeTargeting();
    setupPropertyShape();
    setupConstraintsQuiz();
    setupCardinalityExercise();
    setupSeverityQuiz();
    setupShapeBuilder();
});

function setupShaclComponents() {
    const checkButton = document.getElementById('check-shacl-components');
    if (checkButton) {
        checkButton.addEventListener('click', checkShaclComponents);
    }
}

function setupNodeTargeting() {
    const checkButton = document.getElementById('check-node-targeting');
    if (checkButton) {
        checkButton.addEventListener('click', checkNodeTargeting);
    }
}

function setupPropertyShape() {
    const checkButton = document.getElementById('check-property-shape');
    if (checkButton) {
        checkButton.addEventListener('click', checkPropertyShape);
    }
    
    const resetButton = document.getElementById('reset-property-shape');
    if (resetButton) {
        resetButton.addEventListener('click', resetPropertyShape);
    }
    
    // Setup drag and drop functionality for PropertyShape exercise
    setupPropertyShapeDragAndDrop();
}

function setupPropertyShapeDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-items .drag-item');
    const dropZones = document.querySelectorAll('.drop-zones .drop-zone');
    const dragItemsContainer = document.querySelector('.drag-items');
    
    // Setup drag items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handlePropertyShapeDragStart);
        item.addEventListener('dragend', handlePropertyShapeDragEnd);
    });
    
    // Setup drop zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handlePropertyShapeDragOver);
        zone.addEventListener('dragenter', handlePropertyShapeDragEnter);
        zone.addEventListener('dragleave', handlePropertyShapeDragLeave);
        zone.addEventListener('drop', handlePropertyShapeDrop);
    });
    
    // Setup drag items container to accept items being dragged back
    if (dragItemsContainer) {
        dragItemsContainer.addEventListener('dragover', handlePropertyShapeDragOver);
        dragItemsContainer.addEventListener('dragenter', handleDragItemsContainerEnter);
        dragItemsContainer.addEventListener('dragleave', handleDragItemsContainerLeave);
        dragItemsContainer.addEventListener('drop', handleDragItemsContainerDrop);
    }
}

function handlePropertyShapeDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-value'));
    e.target.classList.add('dragging');
}

function handlePropertyShapeDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handlePropertyShapeDragOver(e) {
    e.preventDefault();
}

function handlePropertyShapeDragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-hover');
}

function handlePropertyShapeDragLeave(e) {
    e.currentTarget.classList.remove('drag-hover');
}

function handlePropertyShapeDrop(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove('drag-hover');

    const draggedValue = e.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`.drag-item[data-value="${draggedValue}"]`);
    const expectedValue = dropZone.getAttribute('data-expects');

    // Check if drop zone already has an item
    if (dropZone.querySelector('.dropped-item')) {
        return; // Don't allow drop if zone is already occupied
    }

    // Hide the original drag item
    if (draggedElement) {
        draggedElement.style.display = 'none';
    }

    // Add the dropped content
    const droppedItem = document.createElement('span');
    droppedItem.textContent = draggedValue;
    droppedItem.className = 'dropped-item';
    droppedItem.draggable = true;
    droppedItem.setAttribute('data-value', draggedValue);

    // Add event listeners for dragging back
    droppedItem.addEventListener('dragstart', handleDroppedItemDragStart);
    droppedItem.addEventListener('dragend', handleDroppedItemDragEnd);

    // Check if it's correct
    if (draggedValue === expectedValue) {
        droppedItem.classList.add('correct-answer');
    } else {
        droppedItem.classList.add('incorrect-answer');
    }

    dropZone.appendChild(droppedItem);
}

function handleDroppedItemDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-value'));
    e.target.classList.add('dragging');
}

function handleDroppedItemDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragItemsContainerEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-hover');
}

function handleDragItemsContainerLeave(e) {
    e.currentTarget.classList.remove('drag-hover');
}

function handleDragItemsContainerDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-hover');

    const draggedValue = e.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`.dropped-item[data-value="${draggedValue}"]`);
    
    if (draggedElement) {
        // Remove the dropped item from the drop zone
        draggedElement.remove();
        
        // Show the original drag item again
        const originalDragItem = document.querySelector(`.drag-item[data-value="${draggedValue}"]`);
        if (originalDragItem) {
            originalDragItem.style.display = 'inline-block';
        }
    }
}

function resetPropertyShape() {
    const dropZones = document.querySelectorAll('.drop-zones .drop-zone');
    const dragItems = document.querySelectorAll('.drag-items .drag-item');
    
    // Clear all drop zones
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('drag-hover');
    });
    
    // Show all original drag items
    dragItems.forEach(item => {
        item.style.display = 'inline-block';
    });
    
    // Clear drag items container hover state
    const dragItemsContainer = document.querySelector('.drag-items');
    if (dragItemsContainer) {
        dragItemsContainer.classList.remove('drag-hover');
    }
    
    const feedback = document.getElementById('property-shape-feedback');
    feedback.style.display = 'none';
}

function setupConstraintsQuiz() {
    const checkButton = document.getElementById('check-constraints-quiz');
    if (checkButton) {
        checkButton.addEventListener('click', checkConstraintsQuiz);
    }
}

function setupSeverityQuiz() {
    const checkButton = document.getElementById('check-severity-quiz');
    if (checkButton) {
        checkButton.addEventListener('click', checkSeverityQuiz);
    }
}


function setupCardinalityExercise() {
    const checkButton = document.getElementById('check-cardinality');
    if (checkButton) {
        checkButton.addEventListener('click', checkCardinality);
    }
}

function setupShapeBuilder() {
    // Set up option selects to update the shape display
    const selects = document.querySelectorAll('.option-selections select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.textContent = this.value;
                targetElement.classList.add('filled');
            }
        });
    });
    
    const checkButton = document.getElementById('check-shape-builder');
    if (checkButton) {
        checkButton.addEventListener('click', checkShapeBuilder);
    }
}


function checkCardinality() {
    const feedback = document.getElementById('cardinality-feedback');
    
    // Define correct answers for each scenario
    const correctAnswers = {
        'card-scenario-1': 'both',    // Exactly one = minCount 1 and maxCount 1
        'card-scenario-2': 'none',    // Zero or more = no constraints
        'card-scenario-3': 'min1'     // At least one = minCount 1
    };
    
    let correct = 0;
    let answered = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    
    Object.keys(correctAnswers).forEach(groupName => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        const scenario = document.querySelector(`input[name="${groupName}"]`).closest('.scenario');
        
        if (selectedRadio) {
            answered++;
            if (selectedRadio.value === correctAnswers[groupName]) {
                scenario.classList.add('correct-answer');
                scenario.classList.remove('incorrect-answer');
                correct++;
            } else {
                scenario.classList.add('incorrect-answer');
                scenario.classList.remove('correct-answer');
            }
        } else {
            scenario.classList.remove('correct-answer', 'incorrect-answer');
        }
    });
    
    feedback.style.display = 'block';
    
    if (answered < totalQuestions) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please answer all questions before checking.</p>';
    } else if (correct === totalQuestions) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Great job! You understand SHACL cardinality constraints.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${totalQuestions} correct. Review cardinality concepts!</p>`;
    }
}

function checkShaclComponents() {
    const selects = document.querySelectorAll('#shacl-component-1, #shacl-component-2, #shacl-component-3, #shacl-component-4');
    const feedback = document.getElementById('shacl-components-feedback');
    
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
        feedback.innerHTML = '<p>🎉 Perfect! You understand SHACL components.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review SHACL components!</p>`;
    }
}

function checkNodeTargeting() {
    const selects = document.querySelectorAll('#targeting-1, #targeting-2, #targeting-3, #targeting-4');
    const feedback = document.getElementById('node-targeting-feedback');
    
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
        feedback.innerHTML = '<p>🎉 Excellent! You understand SHACL node targeting.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review node targeting mechanisms!</p>`;
    }
}

function checkPropertyShape() {
    const dropZones = document.querySelectorAll('.drop-zones .drop-zone');
    const feedback = document.getElementById('property-shape-feedback');
    
    let correct = 0;
    let filled = 0;
    
    dropZones.forEach(zone => {
        const droppedItem = zone.querySelector('.dropped-item');
        if (droppedItem) {
            filled++;
            if (droppedItem.classList.contains('correct-answer')) {
                correct++;
            }
        }
    });
    
    feedback.style.display = 'block';
    
    if (filled < dropZones.length) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please fill in all the drop zones before checking.</p>';
    } else if (correct === dropZones.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand PropertyShapes and their constraints.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${dropZones.length} correct. Review PropertyShape constraints!</p>`;
    }
}

function checkConstraintsQuiz() {
    const feedback = document.getElementById('constraints-quiz-feedback');
    if (!feedback) return;

    const correctAnswers = {
        'constraint-quiz-1': "sh:pattern '^.+@.+\\..+$'",
        'constraint-quiz-2': 'sh:minInclusive -50 and sh:maxInclusive 50',
        'constraint-quiz-3': 'sh:nodeKind sh:IRI'
    };

    let correct = 0;
    let answered = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach(groupName => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        const quizQuestion = document.querySelector(`input[name="${groupName}"]`).closest('.quiz-question');

        if (selectedRadio) {
            answered++;
            if (selectedRadio.value === correctAnswers[groupName]) {
                quizQuestion.classList.add('correct-answer');
                quizQuestion.classList.remove('incorrect-answer');
                correct++;
            } else {
                quizQuestion.classList.add('incorrect-answer');
                quizQuestion.classList.remove('correct-answer');
            }
        } else {
            quizQuestion.classList.remove('correct-answer', 'incorrect-answer');
        }
    });

    feedback.style.display = 'block';

    if (answered < totalQuestions) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please answer all questions before checking.</p>';
    } else if (correct === totalQuestions) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You understand SHACL constraints.</p>';

        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${totalQuestions} correct. Review the constraint types and try again!</p>`;
    }
}

function checkSeverityQuiz() {
    const feedback = document.getElementById('severity-quiz-feedback');
    if (!feedback) return;

    const correctAnswers = {
        'severity-quiz-1': 'violation',
        'severity-quiz-2': 'warning'
    };

    let correct = 0;
    let answered = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    Object.keys(correctAnswers).forEach(groupName => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        const quizQuestion = document.querySelector(`input[name="${groupName}"]`).closest('.quiz-question');

        if (selectedRadio) {
            answered++;
            if (selectedRadio.value === correctAnswers[groupName]) {
                quizQuestion.classList.add('correct-answer');
                quizQuestion.classList.remove('incorrect-answer');
                correct++;
            } else {
                quizQuestion.classList.add('incorrect-answer');
                quizQuestion.classList.remove('correct-answer');
            }
        } else {
            quizQuestion.classList.remove('correct-answer', 'incorrect-answer');
        }
    });

    feedback.style.display = 'block';

    if (answered < totalQuestions) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please answer all questions before checking.</p>';
    } else if (correct === totalQuestions) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand SHACL severity levels.</p>';

        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${totalQuestions} correct. Review severity levels and try again!</p>`;
    }
}

function checkShapeBuilder() {
    const selects = document.querySelectorAll('.option-selections select');
    const feedback = document.getElementById('shape-builder-feedback');
    
    let correct = 0;
    let filled = 0;
    
    selects.forEach((select) => {
        if (select.value) {
            filled++;
            const correctValue = select.getAttribute('data-correct');
            if (select.value === correctValue) {
                select.classList.add('correct-answer');
                select.classList.remove('incorrect-answer');
                correct++;
            } else {
                select.classList.add('incorrect-answer');
                select.classList.remove('correct-answer');
            }
        }
    });
    
    feedback.style.display = 'block';
    
    if (filled < selects.length) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please complete all selections before checking.</p>';
    } else if (correct === selects.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You can build SHACL shapes correctly.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review SHACL shape construction!</p>`;
    }
} 