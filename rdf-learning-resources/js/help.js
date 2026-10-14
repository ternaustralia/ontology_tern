// Help Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Help panel toggle
    const helpButton = document.querySelector('.help-button');
    const helpPanel = document.querySelector('.help-panel');
    const closeHelp = document.querySelector('.close-help');
    
    if (helpButton && helpPanel) {
        // Open help panel
        helpButton.addEventListener('click', function() {
            helpPanel.setAttribute('aria-hidden', 'false');
        });
        
        helpButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                helpPanel.setAttribute('aria-hidden', 'false');
                e.preventDefault();
            }
        });
        
        // Close help panel
        if (closeHelp) {
            closeHelp.addEventListener('click', function() {
                helpPanel.setAttribute('aria-hidden', 'true');
            });
            
            closeHelp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    helpPanel.setAttribute('aria-hidden', 'true');
                    e.preventDefault();
                }
            });
        }
        
        // Close help panel when clicking outside
        document.addEventListener('click', function(event) {
            if (helpPanel.getAttribute('aria-hidden') === 'false') {
                if (!helpPanel.contains(event.target) && event.target !== helpButton) {
                    helpPanel.setAttribute('aria-hidden', 'true');
                }
            }
        });
        
        // Close help panel with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && helpPanel.getAttribute('aria-hidden') === 'false') {
                helpPanel.setAttribute('aria-hidden', 'true');
            }
        });
    }
}); 