import express from "express";

const parsesOptions: Parameters<typeof express.urlencoded>[0] = {
  extended: true,
  limit: "20mb",
  type: "application/x-www-form-urlencoded",
};

export default express.urlencoded(parsesOptions);
