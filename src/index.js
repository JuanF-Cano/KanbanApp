import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";

/* import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); */

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//app.use("/api", express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.clear();
  console.log("Servidor iniciado " + PORT);
});