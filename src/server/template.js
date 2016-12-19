export default function renderFullPage(html, initStateString) {
  return `
<!DOCTYPE html>
  <html lang="en"><head>
    <meta charset="utf-8">
   <title>React/Redux Boilerplate</title>
    <meta name="description" content="React/Redux Boilerplate Repository">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="app">
      ${html}
    </div>
    <script>
      window.__INITIAL_STATE__ = ${initStateString};
    </script>
    <script src="/app.js"></script>
  </body>
</html>
`.replace(/\n */g, '');
}
