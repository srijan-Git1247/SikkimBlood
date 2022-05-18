import { API_URL } from "../../config";
import cookie from "cookie";
//Strapi endpoint users.me
//pass in token to strapi to recieve the user
export default async (req, res) => {
  if (req.method === "POST") {

    //DESTROY OUR COOKIE
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0), //cookies maximum age
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({message:"Success"});
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
