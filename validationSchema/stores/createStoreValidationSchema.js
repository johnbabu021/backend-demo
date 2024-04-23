import { body } from "express-validator";
import Store from "../../models/storeModel.js";

const createStoreValidationSchema = [
  body("name")
    .ltrim()
    .rtrim()
    .notEmpty()
    .custom(async (name, { req }) => {
      const store = await Store.findOne({
        name: new RegExp("^" + name + "$", "i"),
        location: req.body.location,
        status: true,
      });
      if (store) {
        return Promise.reject("Store name already exists in location level");
      }
    }),
  body("location").notEmpty().trim(),
  body("description").optional(),
];

export { createStoreValidationSchema };
