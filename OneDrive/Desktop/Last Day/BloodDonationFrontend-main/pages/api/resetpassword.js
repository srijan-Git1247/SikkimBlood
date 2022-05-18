import { API_URL } from "../../config";
import cookie from "cookie";

//fetching from auth context
export default async (req, res) => {
  const { code, password, passwordConfirmation,codeo} = req.body;
  /*
  console.log("code"+code);
  console.log(password);
  console.log(passwordConfirmation);
  console.log("codeo"+codeo);
  */

  if (req.method === "POST") {
    const strapiRes = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({code,password,passwordConfirmation}),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ message: "password has been reset" }); //passing as response
    } else {
      //sending back error messages
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method${req.method} not allowed` });
  }
};
