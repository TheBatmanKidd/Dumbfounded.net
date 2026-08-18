export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. If someone visits your actual homepage, let them through
    if (url.pathname === "/" || url.pathname === "") {
      // If you are using Cloudflare Pages or an external server, 
      // you can fetch the real home page here:
      return await fetch(request);
    }

    // 2. CATCH-ALL: If they visit ANY path other than the homepage (like /not)
    // Cloudflare will automatically serve your custom 404 page.
    const custom404Html = `
      <!doctype html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>404</title>
          <style>body { font-family: sans-serif; text-align: center; padding: 50px; background: #fafafa; }</style>
      </head>
      <body>
          <h1>404</h1>
          <p>Uhh... Why are you here? This is <b>FORBIDDEN!1!!</b></p>
          <a href="https://www.dumbfounded.net/">go to homepage</a>
      </body>
      </html>
    `;

    return new Response(custom404Html, {
      status: 404,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};
