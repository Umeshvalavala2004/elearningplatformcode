// install.js
let deferredPrompt;
const installButton = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install button
  installButton.style.display = 'block';
  
  installButton.addEventListener('click', () => {
    // Hide the install button
    installButton.style.display = 'none';
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', () => {
  // Hide the install button
  installButton.style.display = 'none';
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  console.log('PWA was installed');
});

// Check if the app is already installed
if (window.matchMedia('(display-mode: standalone)').matches) {
  installButton.style.display = 'none';
}