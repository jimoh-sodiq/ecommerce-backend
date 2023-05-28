import { createResponse } from "../utils/global.js";

const notFound = (req, res) => {
  const responseObject = createResponse(false, null, "Route does not exist");
  res.status(404).send(responseObject.errorMessage);
};

export default notFound;
