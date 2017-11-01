export default function renderFullPage(html) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/style.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <title>Talent</title>
    <link href="/style.css" rel="stylesheet"></head>
    <body>
      <div class="container">${html}</div>
    <script type="text/javascript" src="/bundle.js"></script></body>
    <script src="/bundle.js"></script>
  </html>
  `
}
