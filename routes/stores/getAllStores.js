import express from "express";
import { matchedData } from "express-validator";
import { validateRequest } from "../../helpers/validateRequest.js";
import Store from "../../models/storeModel.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { createdResponse } from "../../responses/successResponses.js";
import { commonGetRequestValidationSchema } from "../../validationSchema/commonSchema.js";
import { getAllStoreValidationSchema } from "../../validationSchema/stores/getStoreValidationSchema.js";
import paginator from "../../helpers/paginator.js";
var router = express.Router();

async function getAllStores(req, res) {
  // const uid = req.user_info.main_uid;
  const requestData = matchedData(req);

  const filterObj = {
    status: true,
  };
  if (requestData.active) {
    filterObj.active = requestData.active;
  }
  if (requestData.location) {
    filterObj.location = req.params.location;
  }
  if (requestData.status) {
    filterObj.status = requestData.status;
  }
  if (requestData.q) {
    filterObj.name = { $regex: requestData.q, $options: "i" };
  }

  try {
    const { skip, limit, page } = paginator(requestData);

    var queryResult = await Store.find(filterObj)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const storeCount = await Store.countDocuments(filterObj).exec();
    const data = {
      stores: queryResult,
      page: Number(page),
      limit: limit,
      totalPageCount: Math.ceil(storeCount / limit),
      totalCount: storeCount,
    };
    //query
    return createdResponse(res, data);
  } catch (err) {
    return internalServerResponse(res);
  }
}
//get all stores
router.get(
  "/:location",
  getAllStoreValidationSchema,
  commonGetRequestValidationSchema,
  validateRequest,
  getAllStores
);

export default router;
