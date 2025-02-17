export default {
    async fetch(request, env, ctx) {
        const html = `<!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha256-MBffSnbbXwHCuZtgPYiwMQbfE7z+GOZ7fBPCNB06Z98=" crossorigin="anonymous">
                <title>Generate - 1.0.0</title>
              </head>
              <body>
                <div class="container">
                  <br>
                  <h3>Username: <button class="btn btn-primary" type="button" onclick="generateEmail(6);">Generate</button></h3>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control" type="text" id="username" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary" type="button" onclick="copyTxt('email');">Copy</button>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control" type="text" id="kuba86.com" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary" type="button" onclick="copyTxt('kuba86.com');">Copy</button>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control" type="text" id="k86.addy.io" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary" type="button" onclick="copyTxt('k86.addy.io');">Copy</button>
                    </div>
                  </div>
                
                  <br>
                  <h3>Password: <button class="btn btn-primary" type="button" onclick="generatePassword(20);">Generate</button></h3>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control" type="text" id="password" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary" type="button" onclick="copyTxt('password');">Copy</button>
                    </div>
                  </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha256-YMa+wAM6QkVyz999odX7lPRxkoYAan8suedu4k2Zur8=" crossorigin="anonymous"></script>
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
                
                  function generateEmail(size) {
                    const randomEmailUser = randomStringGenerator("wertupadfghjkzcnm234679", size)
                    document.getElementById("username").value = randomEmailUser;
                    document.getElementById("kuba86.com").value = randomEmailUser + "@kuba86.com";
                    document.getElementById("k86.addy.io").value = randomEmailUser + "@k86.addy.io";
                  }
                
                  function generatePassword(size) {
                    document.getElementById("password").value = randomStringGenerator("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", size)
                  }
                </script>
              </body>
            </html>
            `;

        return new Response(html, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
        });
    },
};
