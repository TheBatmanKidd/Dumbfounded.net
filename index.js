export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);

    if (response.status === 404) {
      const custom404Html = `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>404</title>
            <style>body { font-family: sans-serif; text-align: center; padding: 50px; }</style>
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
    }

    return response;
  },
};
