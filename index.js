const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

const button = document.getElementById("toggleTitleButton");
const content = document.getElementById("win");

button.addEventListener("click", () => {
  content.hidden = !content.hidden;
});

const windowElement = document.querySelector(".window");

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];

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

if (window.location.protocol === 'https:') {
  console.log("https i see");
} else if (window.location.protocol === 'http:') {
  const htt = document.createElement('a');
  htt.textContent = "I see that you are using http, wow.";
  const targetNav = document.querySelector('body > div > div > span > nav');
  if (targetNav) {
    targetNav.appendChild(htt);
  } else {
    console.error("couldn't find the target nav element.");
  }
}


currentUrl.search = '';

window.history.replaceState(
  { path: currentUrl.href },
  '',
  currentUrl.href
);

const CHECK_INTERVAL = 1500;
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
