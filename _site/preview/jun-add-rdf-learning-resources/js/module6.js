// Module 6 Interactive Elements - SPARQL Queries
document.addEventListener('DOMContentLoaded', function() {
    setupSparqlComponents();
    setupQueryBuilder();
    setupFiltersAndOperators();
    setupOptionalQuery();
    setupAggregations();
    setupQueryAnalysis();
});

function setupSparqlComponents() {
    const checkButton = document.getElementById('check-components');
    if (checkButton) {
        checkButton.addEventListener('click', checkSparqlComponents);
    }
}

function setupQueryBuilder() {
    const checkButton = document.getElementById('check-query-builder');
    if (checkButton) {
        checkButton.addEventListener('click', checkQueryBuilder);
    }
    
    // Setup option buttons
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const value = this.getAttribute('data-value');
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.textContent = value;
                targetElement.classList.add('filled');
            }
        });
    });
}

function setupFiltersAndOperators() {
    const checkButton = document.getElementById('check-filters');
    if (checkButton) {
        checkButton.addEventListener('click', checkFilters);
    }
}

function setupOptionalQuery() {
    const checkButton = document.getElementById('check-optional-query');
    if (checkButton) {
        checkButton.addEventListener('click', checkOptionalQuery);
    }
    
    const resetButton = document.getElementById('reset-optional-query');
    if (resetButton) {
        resetButton.addEventListener('click', resetOptionalQuery);
    }
    
    // Setup drag and drop functionality
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Setup drag items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Setup drop zones
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-value'));
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-hover');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-hover');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-hover');
    
    const draggedValue = e.dataTransfer.getData('text/plain');
    const expectedValue = e.target.getAttribute('data-expects');
    
    // Clear any existing content
    e.target.innerHTML = '';
    
    // Add the dropped content
    const droppedItem = document.createElement('span');
    droppedItem.textContent = draggedValue;
    droppedItem.className = 'dropped-item';
    
    // Check if it's correct
    if (draggedValue === expectedValue) {
        droppedItem.classList.add('correct-answer');
    } else {
        droppedItem.classList.add('incorrect-answer');
    }
    
    e.target.appendChild(droppedItem);
}

function resetOptionalQuery() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('drag-hover');
    });
    
    const feedback = document.getElementById('optional-query-feedback');
    feedback.style.display = 'none';
}

function setupAggregations() {
    const checkButton = document.getElementById('check-aggregations');
    if (checkButton) {
        checkButton.addEventListener('click', checkAggregations);
    }
    
    // Setup aggregation selects to update the display
    const aggSelects = document.querySelectorAll('[data-target]');
    aggSelects.forEach(select => {
        select.addEventListener('change', function() {
            const target = this.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.textContent = this.value;
            }
        });
    });
}

function setupQueryAnalysis() {
    const checkButton = document.getElementById('check-query-analysis');
    if (checkButton) {
        checkButton.addEventListener('click', checkQueryAnalysis);
    }
}

function checkSparqlComponents() {
    const selects = document.querySelectorAll('#sparql-component-1, #sparql-component-2, #sparql-component-3, #sparql-component-4');
    const feedback = document.getElementById('components-feedback');
    
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
        feedback.innerHTML = '<p>🎉 Perfect! You understand SPARQL query structure.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review SPARQL query structure!</p>`;
    }
}

function checkQueryBuilder() {
    const queryType = document.getElementById('query-type');
    const predicate = document.getElementById('predicate');
    const feedback = document.getElementById('query-builder-feedback');
    
    let correct = 0;
    let total = 2;
    
    // Check query type
    if (queryType.textContent.trim() === 'SELECT') {
        queryType.classList.add('correct-answer');
        queryType.classList.remove('incorrect-answer');
        correct++;
    } else {
        queryType.classList.add('incorrect-answer');
        queryType.classList.remove('correct-answer');
    }
    
    // Check predicate
    if (predicate.textContent.trim() === 'dc:creator') {
        predicate.classList.add('correct-answer');
        predicate.classList.remove('incorrect-answer');
        correct++;
    } else {
        predicate.classList.add('incorrect-answer');
        predicate.classList.remove('correct-answer');
    }
    
    feedback.style.display = 'block';
    
    if (correct === total) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You built a correct SPARQL query.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${total} correct. Review the query structure!</p>`;
    }
}

function checkFilters() {
    const radioGroups = ['filter-query-1', 'filter-query-2'];
    const feedback = document.getElementById('filters-feedback');
    
    let correct = 0;
    let answered = 0;
    
    radioGroups.forEach((groupName) => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        if (selectedRadio) {
            answered++;
            const correctValue = groupName === 'filter-query-1' ? 'FILTER(?age > 30)' : 'FILTER(?year > 2020 && REGEX(?title, \'Data\'))';
            if (selectedRadio.value === correctValue) {
                selectedRadio.closest('.quiz-question').classList.add('correct-answer');
                selectedRadio.closest('.quiz-question').classList.remove('incorrect-answer');
                correct++;
            } else {
                selectedRadio.closest('.quiz-question').classList.add('incorrect-answer');
                selectedRadio.closest('.quiz-question').classList.remove('correct-answer');
            }
        }
    });
    
    feedback.style.display = 'block';
    
    if (answered < radioGroups.length) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please answer all questions before checking.</p>';
    } else if (correct === radioGroups.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Excellent! You understand SPARQL filters and operators.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${radioGroups.length} correct. Review filter syntax!</p>`;
    }
}

function checkOptionalQuery() {
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedback = document.getElementById('optional-query-feedback');
    
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
        feedback.innerHTML = '<p>Please fill in all the blanks before checking.</p>';
    } else if (correct === dropZones.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You understand OPTIONAL patterns in SPARQL.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${dropZones.length} correct. Review OPTIONAL patterns!</p>`;
    }
}

function checkAggregations() {
    const selects = document.querySelectorAll('#agg-select-1, #agg-select-2, #agg-select-3, #agg-select-4');
    const feedback = document.getElementById('aggregations-feedback');
    
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
        feedback.innerHTML = '<p>🎉 Great job! You understand SPARQL aggregation functions.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${selects.length} correct. Review aggregation syntax!</p>`;
    }
}

function checkQueryAnalysis() {
    const radioGroups = ['query-analysis-1', 'query-analysis-2'];
    const feedback = document.getElementById('query-analysis-feedback');
    
    let correct = 0;
    let answered = 0;
    
    radioGroups.forEach((groupName) => {
        const selectedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
        if (selectedRadio) {
            answered++;
            if (selectedRadio.value === 'correct') {
                selectedRadio.closest('.radio-question').classList.add('correct-answer');
                selectedRadio.closest('.radio-question').classList.remove('incorrect-answer');
                correct++;
            } else {
                selectedRadio.closest('.radio-question').classList.add('incorrect-answer');
                selectedRadio.closest('.radio-question').classList.remove('correct-answer');
            }
        }
    });
    
    feedback.style.display = 'block';
    
    if (answered < radioGroups.length) {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = '<p>Please answer all questions before checking.</p>';
    } else if (correct === radioGroups.length) {
        feedback.className = 'feedback-message success';
        feedback.innerHTML = '<p>🎉 Perfect! You can analyze and understand SPARQL queries.</p>';
        
        // Show celebration fireworks
        if (typeof showCelebrationFireworks === 'function') {
            showCelebrationFireworks();
        } else if (typeof showFireworks === 'function') {
            showFireworks();
        }
    } else {
        feedback.className = 'feedback-message error';
        feedback.innerHTML = `<p>You got ${correct} out of ${radioGroups.length} correct. Review query analysis!</p>`;
    }
} 