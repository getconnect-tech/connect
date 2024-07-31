import { ServerClient } from "postmark";

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export const sendEmail = async ({ email, subject, body }: any) => {
  const res = await client.sendEmail({
    From: "tarang.ramoliya@pixer.digital",
    To: email,
    Subject: subject,
    HtmlBody: body,
  });
  return res.MessageID;
};
