import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import { prisma } from "./database.js";

const app = express();
app.use(json());
app.use(cors());

app.get("/memes", async (req, res) => {
  const result = await prisma.memes.findMany();
  res.status(200).send(result);
});
app.post("/memes", async (req, res) => {
  const meme = req.body;
  await prisma.memes.create({ data: meme });
  res.status(201).send("Meme criado");
});

export default app;
