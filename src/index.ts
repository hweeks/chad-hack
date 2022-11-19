import express from "express";
import helmet from "helmet";
import fs from "fs";

const app = express();

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  process.stdin.write("headers \n");
  process.stdin.write(JSON.stringify(req.headers, null, 2));
  process.stdin.write("body \n");
  process.stdin.write(JSON.stringify(req.body, null, 2));
  process.stdin.write("\n");
  next();
});

app.get("/", (req, res) => {
  res.send("hey");
});

app.post("/file", (req, res) => {
  const fileToFind = req.body.file;
  try {
    const fileContent = fs.readFileSync(fileToFind, "utf-8");
    res.send(fileContent);
  } catch (err) {
    res.send(err);
  }
});

app.post("/list-files", (req, res) => {
  const dirToOutput = req.body.dir;
  try {
    const fileContent = fs.readdirSync(dirToOutput);
    res.send(fileContent);
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, () => console.log("up"));
