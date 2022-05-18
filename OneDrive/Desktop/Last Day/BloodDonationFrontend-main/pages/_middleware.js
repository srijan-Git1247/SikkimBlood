import { NextResponse } from "next/server";
import * as jose from "jose";
import { APP_URL } from "/config";

export default function Middleware(req) {
  const { cookies } = req;
  const jwt = cookies.token;
  const url = req.url;

  if (
    url.includes("/Donor") ||
    url.includes("/profile") ||
    url.includes("/requests/add")
  ) {
    if (jwt === undefined) {
      return NextResponse.redirect(`${APP_URL}/account/login`);
    }
    try {
      jose.jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET));
      return NextResponse.next();
    } catch (err) {
      //console.log("error")
      //  return NextResponse.redirect(`${APP_URL}/account/login`);
    }
  }
  if (url.includes("/account/login")) {
    if (jwt) {
      try {
        jose.jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET));
        return NextResponse.redirect(`${APP_URL}`);
      } catch (err) {
        //console.log("error")
        //return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}
