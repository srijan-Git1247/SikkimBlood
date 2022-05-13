import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken";
import { APP_URL } from "/config";

export default function middleware(req)

{
    
    
    
    const {cookies}=req;
    const jwt=cookies.token;
    const url=req.url;
    console.log(jwt);
    console.log(url)
    console.log(process.env.SECRET);
    if(url.includes("/Donor")||url.includes("/profile")||url.includes("/requests/add"))
    {
        if(jwt===undefined)
        {
                return NextResponse.redirect(`${APP_URL}/account/login`);
        }
        try{
                verify(jwt,process.env.SECRET);
                return NextResponse.next();
        }
        catch(err)
       
        {
            console.log("error")
          //  return NextResponse.redirect(`${APP_URL}/account/login`);
        }



    }
    if(url.includes("/account/login"))
    {
        if(jwt)
        {
            try{
                verify(jwt, process.env.SECRET);
                return NextResponse.redirect(`${APP_URL}`);
              
        }
        catch(err)
        {
            console.log("error")
             //return NextResponse.next();
        }
                
        }
     



    }
    
   
    return NextResponse.next();



}
