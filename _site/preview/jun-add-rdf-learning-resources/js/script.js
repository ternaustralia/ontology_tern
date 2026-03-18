// Fireworks display function for successful test completion
function showCelebrationFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    if (!fireworksContainer) return;
    
    // Clear any existing fireworks
    fireworksContainer.innerHTML = '';
    fireworksContainer.classList.add('show');
    
    // Create colorful fireworks
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8E8'];
    const fireworkCount = 15;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createCelebrationFirework(fireworksContainer, colors);
        }, i * 150);
    }
    
    // Hide fireworks after animation completes
    setTimeout(() => {
        fireworksContainer.classList.remove('show');
    }, fireworkCount * 150 + 3000);
}

function createCelebrationFirework(container, colors) {
    const firework = document.createElement('div');
    firework.classList.add('firework', 'celebration-firework');
    
    // Random color from our palette
    const color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--firework-color', color);
    
    // Random position
    const x = Math.random() * 90 + 5; // 5-95% of width
    const y = Math.random() * 70 + 10; // 10-80% of height
    firework.style.left = x + '%';
    firework.style.top = y + '%';
    
    // Random size
    const size = Math.random() * 40 + 20; // 20-60px
    firework.style.width = size + 'px';
    firework.style.height = size + 'px';
    
    container.appendChild(firework);
    
    // Remove after animation completes
    setTimeout(() => {
        if (firework.parentNode) {
            firework.remove();
        }
    }, 2500);
}

// Legacy function name for backward compatibility
function showFireworks() {
    showCelebrationFireworks();
} 