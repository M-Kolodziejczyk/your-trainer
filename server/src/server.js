global.fetch = require("node-fetch");
const http = require("http");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".", ".env") });

const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  });
}
startServer();
