import express from "express";
import { startConsuming } from "./utils/rabbitmq";

const app = express();
app.use(express.json());
startConsuming();

app.listen(8011, () => console.log("Notification Services Listening on port 8011"));
