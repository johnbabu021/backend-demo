import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connect } from "./db/index.js";
import createStore from "./routes/stores/createStore.js";
import getAllStores from "./routes/stores/getAllStores.js";
import getStoreById from "./routes/stores/getStoreById.js";
import updateStoreById from "./routes/stores/updateStoreById.js";
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

/**
 *
 * dotenv config
 */
const __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

/**
 *
 * connect to mongodb
 */
connect();

/**
 *
 */
app.use("/createStore", createStore);
app.use("/getAllStores", getAllStores);
app.use("/getStoreById", getStoreById);
app.use("/updateStoreById", updateStoreById);

/**
 *
 *
 *
 * start listening to requests
 */
app.listen(port, () => {
  console.log(`Store service listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", service: "Store Service" });
});
