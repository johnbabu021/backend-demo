/**
 *
 * @param {*} res
 * @param {*} data
 * @returns 500
 */

const internalServerResponse = (res, data = "Internal server error") => {
  return res.status(500).json({
    status: false,
    data,
  });
};
export { internalServerResponse };
