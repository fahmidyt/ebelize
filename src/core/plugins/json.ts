import express from "express";

const parsesOptions: Parameters<typeof express.json>[0] = {
  limit: "20mb",
  type: "application/json",
};

export default express.json(parsesOptions);
