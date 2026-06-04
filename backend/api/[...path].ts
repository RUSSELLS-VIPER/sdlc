import app from "../src/app";
import { applyCors } from "./_cors";

export default function handler(req: any, res: any) {
  if (applyCors(req, res)) return;

  return app(req, res);
}
