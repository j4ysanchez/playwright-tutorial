import cors from "cors";
import express from "express";
import { ordersRouter } from "./routes/orders.js";
import { pizzasRouter } from "./routes/pizzas.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.use("/api", pizzasRouter);
app.use("/api", ordersRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Pizza API listening on http://localhost:${port}`);
});
