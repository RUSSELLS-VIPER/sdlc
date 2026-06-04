const allowedMethods = "GET,OPTIONS,PATCH,DELETE,POST,PUT";
const allowedHeaders =
  "Authorization,Content-Type,Accept,Accept-Version,Content-Length,Content-MD5,Date,X-Api-Version,X-CSRF-Token,X-Requested-With";

export function applyCors(req: any, res: any) {
  const origin = req.headers?.origin;

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", allowedMethods);
  res.setHeader("Access-Control-Allow-Headers", allowedHeaders);
  res.setHeader("Access-Control-Max-Age", "86400");

  if (origin) {
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return true;
  }

  return false;
}
