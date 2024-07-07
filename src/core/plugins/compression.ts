import compression from "compression";

const compressionOptions: compression.CompressionOptions = {
  level: 9,
  threshold: 0,
};

export default compression(compressionOptions);
