import express from "express";
import { setupApp } from "./setup-app";

// создание приложения
export const app = express();
setupApp(app);

export default app;
// порт приложения
if(require.main === module) {
  const PORT = process.env.PORT || 5001;

// запуск приложения
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

