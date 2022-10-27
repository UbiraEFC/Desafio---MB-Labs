import { app } from "./infra/app";
import { config } from "./config";

app.listen(config.port, () => console.log(`Server is running on port: ${config.port}`));