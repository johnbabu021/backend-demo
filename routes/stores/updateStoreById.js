import express from "express";
var router = express.Router();

//import models
import { matchedData } from "express-validator";
import { validateRequest } from "../../helpers/validateRequest.js";
import Store from "../../models/storeModel.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { createdResponse } from "../../responses/successResponses.js";
import { updateStoreValidationSchema } from "../../validationSchema/stores/updateStoreValidationSchema.js";

async function updateStoreById(req, res) {
  //request payload

  const requestData = matchedData(req);

  try {
    const writeResult = await Store.findByIdAndUpdate(
      { _id: requestData.storeId },
      {
        ...requestData,
      },
      { new: true }
    );
    return createdResponse(res, writeResult);
  } catch (err) {
    return internalServerResponse(res);
  }
}
//new buyer
router.patch(
  "/",
  updateStoreValidationSchema,
  validateRequest,
  updateStoreById
);

export default router;
