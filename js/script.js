//Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered!'))
        .catch(err => console.log('SW registration failed: ', err));
    });
  }

