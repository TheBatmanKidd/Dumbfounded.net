const currentUrl = new URL(window.location.href);
const urlParams = currentUrl.searchParams;

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
  }
}, {
  threshold: 0
});

observer.observe(windowElement);

observer.observe(firstWindow);

if (urlParams.get('utm_source') === 'chatgpt.com') {
    document.title = "Dumbfounded™ - ChatGPT, Really?";
}

if (currentUrl.pathname !== '/home') {
    currentUrl.pathname = '/home';
}

currentUrl.search = '';

window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
