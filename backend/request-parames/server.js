const http = require("http");
const fs = require("fs");
const port = 8000;
const ip = "localhost";

const server = http.createServer();

const sendRes = (filename, statusCode, response) => {
  // fs => load project file and return status code, data, error
  fs.readFile(`./frontend/${filename}`, (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Page not found");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

server.on("request", (req, res) => {
  const { url, method } = req;

  if (method === "GET") {
    switch (url) {
      case "/":
        console.log("index.html", res);
        return sendRes("index.html", 200, res);
      default:
        break;
    }
  }
});

server.listen(port, ip, () => {
  console.log(`Server is running at http:${ip}:${port}`);
});
