import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

const webhooks = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("evento recebido");

  res.status(200).json({ ok: true });
};

export default webhooks;
