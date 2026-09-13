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

let currentScriptHash = null;

function detectBuildChange() {
    fetch('/index.html', { cache: 'no-cache' })
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const mainScript = doc.querySelector('script[src*="main"]');
            const newHash = mainScript ? mainScript.getAttribute('src') : null;

            if (!currentScriptHash) {
                currentScriptHash = newHash;
                return;
            }

            if (newHash && newHash !== currentScriptHash) {
                window.location.reload();
            }
        });
}

setInterval(detectBuildChange, 5 * 60 * 1000);
