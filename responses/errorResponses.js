/**
 *
 * @param {*} res
 * @param {*} data
 * @returns 400
 */
const badRequest = (res, data) => {
  return res.status(400).json({
    status: 400,
    data,
  });
};
/**
 *
 * @param {*} res
 * @param {*} data
 * @returns 403
 */
const unauthorized = (res, data) => {
  return res.status(403).json({
    status: 403,
    data,
  });
};
export { badRequest, unauthorized };
