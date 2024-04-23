/**
 *
 * @param {*} requestData
 * @returns {object} retuns an object which contains page,limit,skip of the data being paginated
 */

export default function paginator(requestData) {
  let pageData = { page: null, limit: null, skip: 0 };
  if (requestData.page && requestData.limit) {
    pageData.page = parseInt(requestData.page);
    pageData.limit = parseInt(requestData.limit);
    pageData.skip = (pageData.page - 1) * pageData.limit;
  }
  return pageData;
}
