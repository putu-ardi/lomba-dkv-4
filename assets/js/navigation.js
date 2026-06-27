/**
 * Navigation and Routing helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Setup breadcrumbs or back buttons if they exist
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Simple logic: if in module, go to root index.html
      // In real scenario, might need more robust path handling
      window.location.href = '../index.html';
    });
  }
  
  // Register Service Worker for offline capability
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Find the correct path to sw.js based on current location
      const depth = window.location.pathname.split('/').length - 1;
      // Very basic path resolution for GitHub Pages
      let swPath = './sw.js';
      if (window.location.pathname.includes('/modul-') || window.location.pathname.includes('/kuis-')) {
        swPath = '../sw.js';
      }
      
      navigator.serviceWorker.register(swPath).then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});
