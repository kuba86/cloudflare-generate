/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha256-wLz3iY/cO4e6vKZ4zRmo4+9XDpMcgKOvv/zEU3OMlRo=" crossorigin="anonymous">
    <title>Generate Email and Password</title>
  </head>
  <body>
    <div class="container">
      <br>
      <h3>Email: <button class="btn btn-primary" type="button" onclick="generateEmail();">Generate</button></h3>
      <div class="row">
        <div class="col-9">
          <input class="form-control" type="email" id="email" value="" disabled>
        </div>
        <div class="col-1">
          <button class="btn btn-primary" type="button" onclick="copyTxt('email');">Copy</button>
        </div>
      </div>
    
      <br>
      <h3>Password: <button class="btn btn-primary" type="button" onclick="generatePassword();">Generate</button></h3>
      <div class="row">
        <div class="col-9">
          <input class="form-control" type="text" id="password" value="" disabled>
        </div>
        <div class="col-1">
          <button class="btn btn-primary" type="button" onclick="copyTxt('password');">Copy</button>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha256-lSABj6XYH05NydBq+1dvkMu6uiCc/MbLYOFGRkf3iQs=" crossorigin="anonymous"></script>
    <script>
      function copyTxt(id) {
        const text = document.getElementById(id).value;
        navigator.clipboard.writeText(text);
      }
    
      function randomStringGenerator(poolOfChars, lengthOfString) {
        const charsArray = poolOfChars.split("")
        const charsArrayLength = charsArray.length
        const randomNumbersArray = new Uint32Array(lengthOfString)
        crypto.getRandomValues(randomNumbersArray)
        return Array.from(randomNumbersArray).map((x) => charsArray[x % charsArrayLength]).join("")
      }
    
      function generateEmail() {
        const randomEmailUser = randomStringGenerator("wertupadfghjkzcnm234679", 6)
        document.getElementById("email").value = randomEmailUser + "@kuba86.com"
      }
    
      function generatePassword() {
        const randomPassword = randomStringGenerator("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$$%^&*()_-", 25)
        document.getElementById("password").value = randomPassword
      }
    </script>
  </body>
</html>
`;

export default {
	async fetch(request, env, ctx) {
		return new Response(html, {
			headers: {
			  'content-type': 'text/html;charset=UTF-8',
			},
		  });
	},
};
