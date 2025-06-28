import app from "./app";
import { connectDB } from "./app/config/db";
const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Dr.Tech Task on port ${PORT}`));
});
