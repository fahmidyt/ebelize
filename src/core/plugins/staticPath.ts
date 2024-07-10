import express from "express";
import path from "path";

const resolvePath = path.resolve(__dirname, "../../../public");

export default express.static(resolvePath);
