const express = require("express");
const app = express();
const redis = require("redis");
const port = 3000;

const client = redis.createClient({
  host: "cache",
  port: 6379,
});

client.set("visits", 0);

app.get("/", (req, res) => {
  const visits = parseInt(client.get("visits"));
  client.set("visits", visits + 1);
  res.send(`Number of visits ${visits + 1}`);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
