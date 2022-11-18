import express, { Application } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();
// creat port number
const PORT = process.env.PORT || 3000;
// create an  server
const app: Application = express();
// HTTP request  middleware
app.use(morgan("dev"));

app.use(router);

// start express server
app.listen(PORT, () => {
  console.log(`Server is started at prot:${PORT}`);
});
export default app;
