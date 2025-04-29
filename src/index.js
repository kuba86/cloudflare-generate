export default {
    async fetch(request, env, ctx) {
        const realIp = request.headers.get("x-real-ip");
        const connectingIp = request.headers.get("cf-connecting-ip");
        //const url1 = `https://ipinfo.io/${realIp}?token=${env.ipinfo_token}`;

        async function apiCall(url) {
            const response = await fetch(url);
            const result = await response.text();
            return JSON.parse(result);
        }

        //const json = await apiCall(url1);

        function getCurrentDateTimeInWarsaw() {
            const now = new Date();
            const options = {
                timeZone: 'Europe/Warsaw',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };
            return now.toLocaleString('pl-PL', options);
        }

        const urlLastPart = request.url
            .replaceAll("https://", "")
            .replaceAll("http://", "")
            .replaceAll(request.headers.get("host") + "/", "")

        if (urlLastPart !== "favicon.ico" && 1 === 0) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 seconds timeout

            try {
                await fetch('https://ntfy.kuba86.com/cloudflare-workers', {
                    method: 'POST', // PUT works too
                    headers: {
                        'Authorization': `Bearer ${env.ntfy_token}`,
                        'Title': `Generate | ${realIp}`,
                        'Priority': 'low',
                        'Tags': 'cloudflare,Generate'
                    },
                    signal: controller.signal,
                    body:
                        `${urlLastPart}\n`+
                        `${getCurrentDateTimeInWarsaw()}\n`+
                        `IP: ${realIp}\n`+
                        `Organization: ${json.org}\n`+
                        `Hostname: ${json.hostname}\n`+
                        `Country: ${json.country}\n`+
                        `Region: ${json.region}\n`+
                        `City: ${json.city}\n`+
                        `Postal: ${json.postal}\n`+
                        `Timezone: ${json.timezone}\n`+
                        `UA: ${request.headers.get("user-agent")}\n`
                });
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch request timed out after 1 second');
                } else {
                    console.error('Fetch error:', error);
                }
            } finally {
                clearTimeout(timeoutId);
            }
        }



        const html = `<!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha256-PI8n5gCcz9cQqQXm3PEtDuPG8qx9oFsFctPg0S5zb8g=" crossorigin="anonymous">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" integrity="sha256-9kPW/n5nn53j4WMRYAxe9c1rCY96Oogo/MKSVdKzPmI=" crossorigin="anonymous">
                <title>Generate - 1.0.0</title>
              </head>
              <body>
                <div class="container">
                  <br>
                  <h3>Username: <button class="btn btn-primary btn-sm" type="button" onclick="generateEmail(6);">Generate</button></h3>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control form-control-sm" type="text" id="username" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('email');">Copy</button>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control form-control-sm" type="text" id="kuba86.com" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('kuba86.com');">Copy</button>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control form-control-sm" type="text" id="k86.addy.io" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('k86.addy.io');">Copy</button>
                    </div>
                  </div>
                
                  <br>
                  <h3>Password: <button class="btn btn-primary btn-sm" type="button" onclick="generatePassword(20);">Generate</button></h3>
                  <div class="row">
                    <div class="col-9">
                      <input class="form-control form-control-sm" type="text" id="password" value="" disabled>
                    </div>
                    <div class="col-1">
                      <button class="btn btn-primary btn-sm" type="button" onclick="copyTxt('password');">Copy</button>
                    </div>
                  </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw=" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha256-Nn1q/fx0H7SNLZMQ5Hw5JLaTRZp0yILA/FRexe19VdI=" crossorigin="anonymous"></script>
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
                  
                  const numbers = "0123456789";
                  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
                  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  const symbols = "-!^_,.";
                
                  function generatePassword(size) {
                    document.getElementById("password").value = randomStringGenerator(numbers+lowerLetters+upperLetters+symbols, size)
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
