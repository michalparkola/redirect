function printRedirectTable(redirectTable) {
  var foo;
  foo = "<table border=1 cellpadding=5 style=\"border-collapse: collapse;\">";
  for (var shortName in redirectTable) {
    var linkURL = redirectTable[shortName]
    linkURL = "<a href=\"" + linkURL + "\">" + linkURL + "</a>"
    
    foo += "<tr>";
    foo += "<td>" + shortName + "</td>";
    foo += "<td>" + linkURL + "</td>"
    foo += "</tr>";
  }
  foo += "</table>";
  return foo;
}

function extractShortNameFromRequest(request) {
  var url = require('url');
  var path = url.parse(request.url, true).path;
  // strip leading slash
  return path.substring(1);
}

function respondWithFavicon(response) {
  // TODO
  response.writeHead(404);
  response.end();
}

function respondWithMsg(msg, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(msg);
  response.end();
}

function respondWithAllShortcuts(shortName, redirectTable, response) {
  var msg = "";
  if (shortName != "") {
    msg += "<p>\"" + shortName;
    msg += "\" doesn't look like anything to me.</p>";
  }
  msg += "<p>Here are the known redirects:</p>";
  msg += printRedirectTable(redirectTable);
  respondWithMsg(msg, response);
}

function respondWithRedirectTo(redirectToUrl, response) {
  response.writeHead(302, {'Location': redirectToUrl});
  response.end();
}

function resolveShortNameFromDB(shortName, response) {
  var sqlite3 = require("sqlite3");
  var file = "redirectTable.sqlite3";
  var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);

  var q = "SELECT shortName, redirectToURL FROM redirectTable";
  var resolveShortName = function(err, rows) {
    // TODO Correct, idiomatic error handling
    if(err)
      console.log(err);

    var redirectTable = {};
    for (i in rows) {
      var row = rows[i];
      redirectTable[row.shortName] = row.redirectToURL;
    }

    if (shortName in redirectTable)
      respondWithRedirectTo(redirectTable[shortName], response);
    else
      respondWithAllShortcuts(shortName, redirectTable, response);
  };

  db.parallelize(function() { db.all(q, resolveShortName); });
  db.close();
}

function constructResponse(request, response) {
  var shortName = extractShortNameFromRequest(request);
  if (shortName == "favicon.ico")
    respondWithFavicon(response);
  else
    resolveShortNameFromDB(shortName, response)
}

var http = require("http");
http.createServer(constructResponse).listen(80);
console.log('Server running');
