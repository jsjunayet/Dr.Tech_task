import express from "express";
import { globalMiddleWare } from "./app/middleware/globalMiddleware";
import notFound from "./app/middleware/noFound";
import router from "./app/router";

const app = express();
app.use(express.json());
app.use("/", router);
app.use(notFound);
app.use(globalMiddleWare);

export default app;
