const express = require("express");
const axios = require("axios");
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
const router = express.Router();

router.route("/").post(
  asyncHandler(async (req, res, next) => {
    axios
      .create({
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .post(req.query.url, req.body)
      .then((resp) => {
        res.status(resp.status).json(resp.data);
      });
  })
);

module.exports = router;
