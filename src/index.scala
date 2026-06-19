import scala.scalajs.js
import scala.scalajs.js.annotation._
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import scala.concurrent.Future
import scala.scalajs.js.JSConverters._

@JSExportTopLevel("default")
object Worker extends js.Object {
  val fetch: js.Function3[js.Dynamic, js.Dynamic, js.Dynamic, js.Promise[js.Dynamic]] = { (request: js.Dynamic, env: js.Dynamic, ctx: js.Dynamic) =>
    val realIp = request.headers.get("x-real-ip").asInstanceOf[String]
    val connectingIp = request.headers.get("cf-connecting-ip").asInstanceOf[String]
    //val url1 = s"https://ipinfo.io/$realIp?token=${env.selectDynamic("ipinfo_token")}"

    def apiCall(url: String): Future[js.Dynamic] = {
      js.Dynamic.global.fetch(url).asInstanceOf[js.Promise[js.Dynamic]].toFuture.flatMap { response =>
        response.text().asInstanceOf[js.Promise[String]].toFuture
      }.map { result =>
        js.JSON.parse(result)
      }
    }

    // val json = await apiCall(url1)
    val json = js.Dynamic.global.json // Map JS global scope for 'json'

    def getCurrentDateTimeInWarsaw(): String = {
      val now = js.Dynamic.newInstance(js.Dynamic.global.Date)()
      val options = js.Dynamic.literal(
        timeZone = "Europe/Warsaw",
        year = "numeric",
        month = "2-digit",
        day = "2-digit",
        hour = "2-digit",
        minute = "2-digit",
        second = "2-digit"
      )
      now.applyDynamic("toLocaleString")("pl-PL", options).asInstanceOf[String]
    }

    val host = request.headers.get("host").asInstanceOf[String]
    val urlStr = request.url.asInstanceOf[String]

    val urlLastPart = urlStr
      .replace("https://", "")
      .replace("http://", "")
      .replace((if (host == null) "" else host) + "/", "")

    val processFuture: Future[Unit] = if (urlLastPart != "favicon.ico" && 1 == 0) {
      val controller = js.Dynamic.newInstance(js.Dynamic.global.AbortController)()
      val timeoutId = js.Dynamic.global.setTimeout(() => controller.abort(), 3000)

      val fetchFuture = js.Dynamic.global.fetch("https://ntfy.kuba86.com/cloudflare-workers", js.Dynamic.literal(
        method = "POST",
        headers = js.Dynamic.literal(
          "Authorization" -> s"Bearer ${env.selectDynamic("ntfy_token")}",
          "Title" -> s"Generate | $realIp",
          "Priority" -> "low",
          "Tags" -> "cloudflare,Generate"
        ),
        signal = controller.signal,
        body = s"$urlLastPart\n" +
               s"${getCurrentDateTimeInWarsaw()}\n" +
               s"IP: $realIp\n" +
               s"Organization: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("org")}\n" +
               s"Hostname: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("hostname")}\n" +
               s"Country: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("country")}\n" +
               s"Region: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("region")}\n" +
               s"City: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("city")}\n" +
               s"Postal: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("postal")}\n" +
               s"Timezone: ${if (js.isUndefined(json)) "undefined" else json.selectDynamic("timezone")}\n" +
               s"UA: ${request.headers.get("user-agent")}\n"
      )).asInstanceOf[js.Promise[js.Dynamic]].toFuture

      fetchFuture.map(_ => ()).recover { case error: Throwable =>
        error match {
          case jsErr: js.JavaScriptException =>
            val exceptionObj = jsErr.exception.asInstanceOf[js.Dynamic]
            if (exceptionObj.selectDynamic("name").asInstanceOf[String] == "AbortError") {
              js.Dynamic.global.console.log("Fetch request timed out after 1 second")
            } else {
              js.Dynamic.global.console.error("Fetch error:", exceptionObj)
            }
          case _ =>
            js.Dynamic.global.console.error("Fetch error:", error.getMessage)
        }
      }.map { _ =>
        js.Dynamic.global.clearTimeout(timeoutId)
        ()
      }
    } else {
      Future.successful(())
    }

    processFuture.map { _ =>
      val html = """<!doctype html>
            <html lang="en" data-bs-theme="dark">
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
                    document.getElementById("password").value = randomStringGenerator(numbers+lowerLetters+upperLetters, size)
                  }
                </script>
              </body>
            </html>"""

      js.Dynamic.newInstance(js.Dynamic.global.Response)(html, js.Dynamic.literal(
        headers = js.Dynamic.literal(
          "content-type" -> "text/html;charset=UTF-8"
        )
      ))
    }.toJSPromise
  }
}
