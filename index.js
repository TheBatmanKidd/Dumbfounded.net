const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

const button = document.getElementById("toggleTitleButton");
const content = document.getElementById("win");

button.addEventListener("click", () => {
  content.hidden = !content.hidden;
});

const mascotImg = document.querySelector('.mask'); 
const windowElement = document.getElementById('win');

let paragraphText = document.querySelector('.mascot-text');
if (!paragraphText && mascotImg) {
  paragraphText = document.createElement('p');
  paragraphText.className = 'mascot-text';
  paragraphText.textContent = "Welcome to the inner circle.";
  mascotImg.parentNode.appendChild(paragraphText);
}

if (mascotImg) {
  mascotImg.style.cursor = 'pointer';
  mascotImg.addEventListener('click', () => {
    mascotImg.classList.toggle('slide-left');
    paragraphText.classList.toggle('fade-in');
  });
}

const observer = new IntersectionObserver((entries) => {
  const entry = entries;

  if (!entry.isIntersecting) {
    if (!document.querySelector(".top-left")) {
      const topLeft = document.createElement("div");
      topLeft.className = "top-left";
      topLeft.textContent = document.title;
      document.body.appendChild(topLeft);
    }
  } else {
    const topLeft = document.querySelector(".top-left");

    if (topLeft) {
      topLeft.remove();
    }
  }
}, {
  threshold: 0
});

if (windowElement) {
  observer.observe(windowElement);
}

if (urlParams.get('utm_source') === 'chatgpt.com') {
  document.title = "Dumbfounded™ - ChatGPT, Really?";
}

if (currentUrl.pathname !== '/home') {
  currentUrl.pathname = '/home';
}

currentUrl.search = '';

window.history.replaceState(
  { path: currentUrl.href },
  '',
  currentUrl.href
);

const CHECK_INTERVAL = 5000;
const FILES_TO_CHECK = ['/index.html', '/style.css', '/index.js'];

let initialFileFingerprints = {};

async function getFileFingerprint(url) {
    try {
        const response = await fetch(url, { 
            method: 'GET',
            cache: 'no-store',
            cf: {
                cacheTtl: -1,
                cacheEverything: false
            },
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) return null;

        const text = await response.text();
        return text.length + text.slice(-100);
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function checkForWebsiteUpdates() {
    let updateDetected = false;

    for (const fileUrl of FILES_TO_CHECK) {
        const serverFingerprint = await getFileFingerprint(fileUrl);
        
        if (!serverFingerprint) continue; 

        if (!initialFileFingerprints[fileUrl]) {
            initialFileFingerprints[fileUrl] = serverFingerprint;
            continue;
        }

        if (initialFileFingerprints[fileUrl] !== serverFingerprint) {
            updateDetected = true;
            break; 
        }
    }

    if (updateDetected) {
        window.location.reload();
    }
}

checkForWebsiteUpdates();
setInterval(checkForWebsiteUpdates, CHECK_INTERVAL);
