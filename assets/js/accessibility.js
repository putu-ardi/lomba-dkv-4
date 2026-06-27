/**
 * Accessibility Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Add keyboard navigation support for custom interactive elements
  // Elements with role="button" should trigger on Enter and Space
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.getAttribute('role') === 'button') {
        e.preventDefault();
        activeElement.click();
      }
    }
  });
  
  // Optional: focus management for modals/popups
});
