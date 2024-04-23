import express from "express";
var router = express.Router();

//import models
import { validateRequest } from "../../helpers/validateRequest.js";
import Store from "../../models/storeModel.js";
import { getStoreValidationByIdSchema } from "../../validationSchema/stores/getStoreValidationSchema.js";
async function getStoreDetailsById(req, res) {
  //payload
  const storeId = req.params.storeId;

  //validate userId

  try {
    //query
    let query = Store.findOne({ _id: storeId }).populate("tax");

    //execute query
    const queryResult = await query.exec();

    //return result
    res.status(200).json({ status: true, data: queryResult });
  } catch (err) {
    res.status(500).json({ status: false, error: err });
  }
}
//get user by id
router.get(
  "/:storeId",
  getStoreValidationByIdSchema,
  validateRequest,
  getStoreDetailsById
);

export default router;
