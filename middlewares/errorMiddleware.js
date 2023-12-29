import "dotenv/config";
import STATUS_CODE from "../constants/StatusCode.js";

export function errorHandler(err, req, res, enxt) {
  const statusCode =
    res.statusCode === STATUS_CODE.OK
      ? STATUS_CODE.INTERNAL_SERVER_ERROR
      : res.statusCode;
  res.status(statusCode);
  res.send({
    message: err.message,
    stack: process.env.NODE_END === "production" ? null : err.stack,
  });
}