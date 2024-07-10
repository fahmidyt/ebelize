import requestIp, { type Options } from "request-ip";

const requestIpConfig: Options = {
  attributeName: "clientIp",
};

export default requestIp.mw(requestIpConfig);
