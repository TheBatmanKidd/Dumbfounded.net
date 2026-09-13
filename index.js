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
        const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
        
        if (!response.ok) return null;

        const etag = response.headers.get('ETag');
        const lastModified = response.headers.get('Last-Modified');

        return etag || lastModified || null;
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
