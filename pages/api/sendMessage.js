import twilio from "twilio";

export default function SendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, mes } = req.body;
  console.log(phone, mes);
  client.messages
    .create({
      body: mes,
      from: process.env.TWILIONUM,
      to: phone,
    })
    .then((mes) =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}
