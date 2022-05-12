import { API_URL } from "../../config";
import cookie from "cookie";


//fetching from auth context
export default async (req, res) => {
  const { email, emailo } = req.body;
  console.log(email);

  if (req.method === "POST") {
    const strapiRes = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ emailo, email }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ message: "emailsent" }); //passing as response
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
