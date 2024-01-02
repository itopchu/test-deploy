var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwa_zoo/sw.js', { scope: '/pwa_zoo/'})
    .then(function (registration) { // Corrected here
      console.log('Service worker registered with scope!', registration.scope);
    })
    .catch(function(err) {
      console.log(err);
    });
}

//not commited yet
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
})
//not commited yet

function toggleMenu() {
  let links = document.querySelector("#navLinks");
  if (links.style.display === "block") {
    links.style.display = "none";
  } else {
    links.style.display = "block";
    if (deferredPrompt) {
      deferredPrompt.prompt();
    
      deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
    
        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }
      });
    
      deferredPrompt = null;
    } 
  }
  }
//function openCreatePostModel()
//createPostArea.style.display = 'block';

let icon = document.querySelector(".icon");
icon.addEventListener("click", toggleMenu);

