import express from "express";
var router = express.Router();

//import models
import { matchedData } from "express-validator";
import { validateRequest } from "../../helpers/validateRequest.js";
import Store from "../../models/storeModel.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { createdResponse } from "../../responses/successResponses.js";
import { createStoreValidationSchema } from "../../validationSchema/stores/createStoreValidationSchema.js";

async function createStore(req, res) {
  //request payload
  const requestData = matchedData(req);

  try {
    const store = new Store({
      ...requestData,
      status: true,
      active: true,
    });

    //save address
    const writeResult = await store.save();

    return createdResponse(res, writeResult);
  } catch (err) {
    console.log({ err });
    return internalServerResponse(res);
  }
}
//create chatbot
router.post("/", createStoreValidationSchema, validateRequest, createStore);

export default router;
