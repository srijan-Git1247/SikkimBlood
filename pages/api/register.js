import { API_URL } from "../../config";
import cookie from "cookie";

//fetching from auth context
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    //console.log(req.body);
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();
    
    if (strapiRes.ok) {
      //set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24, //cookies maximum age
          sameSite: "strict",
          path: "/",
        })
      );
      //user=>data and the jwt(stored in cookie)
      res.status(200).json({ user: data.user }); //passing as response
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
