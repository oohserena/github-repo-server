import express from "express";
import SearchRoutes from "./Search-repo/routes.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.get('/', (req, res) => {
  res.send('GitHub Repos');
});

SearchRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


