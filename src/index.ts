import "dotenv/config";
import { app } from "./app.js";
import { AppDataSource } from "./database/db.js";

AppDataSource.initialize()
  .then(() => {
    app.listen(Number(process.env.PORT) || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((e: Error) => console.log("Error connecting DB ", e.message));
