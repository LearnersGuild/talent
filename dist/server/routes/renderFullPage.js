"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderFullPage;
function renderFullPage(html) {
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link rel=\"stylesheet\" href=\"/style.css\">\n      <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css\">\n      <title>Talent</title>\n    </head>\n    <body>\n      <div class=\"container\">" + html + "</div>\n    <script type=\"text/javascript\" src=\"/bundle.js\"></script></body>\n  </html>\n  ";
}