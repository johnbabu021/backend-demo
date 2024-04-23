import { body, param } from "express-validator";

const getAllStoreValidationSchema = [
  param("location").trim().notEmpty().isString(),
];

const getStoreValidationByIdSchema = [
  body("storeId")
    .notEmpty()
    .custom((storeId) => mongoose.Types.ObjectId.isValid(storeId)),
];

export { getAllStoreValidationSchema, getStoreValidationByIdSchema };
