/**
 * 
 * @param {*} success true | false
 * @param {*} errorMessage error text
 * @param {*} data { key: value }
 * @returns void
 */


export function createResponse(
  success,
  data = null,
  errorMessage = null,
) {
  return {
    success: success,
    data: data,
    errorMessage: errorMessage,
  };
}
