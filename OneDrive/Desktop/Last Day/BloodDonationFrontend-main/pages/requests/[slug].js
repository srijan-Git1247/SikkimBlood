import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import styles from "../../styles/Request.module.css";
import Link from "next/link";
import Image from "next/image";
//import { FaTimes } from "react-icons/fa";
//import { IoChatbubble } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function EventPage({ evt }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleRespond = async () => {
    // console.log(user);
    if (!user || user.role.type === "authenticated") {
      toast.error("Please Register as a donor first");
      return;
    } else {
      let { username, email, BloodType, PhoneNumber, address } = user;
      let donor = {
        Name: username,
        Email: email,
        BloodType: BloodType,
        Contact: PhoneNumber,
        Address: address,
      };
      //console.log(donor);
      //if blood donor
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "GET",
      });
      const data = await res.json();
      //console.log(data);
      if (data.Donors === null) {
        data.Donors = [];
      }

      for (let i = 0; i < data.Donors.length; i++) {
        if (JSON.stringify(data.Donors[i]) === JSON.stringify(donor)) {
          toast.error("You have already responded to the request");
          return;
        }
      }
      if (confirm("Do you want to respond to this request?")) {
        data.Donors.push(donor);

        //console.log(data);
        const register = await fetch(`${API_URL}/events/${evt.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!register.ok) {
          if (register.status === 403 || register.status === 401) {
            toast.error("You are not authorized");
            return;
          }
          toast.error("Something went wrong");
        } else {
          //const evt = await register.json();
          /*Send sms







          */
          const mes = `Congratulations!! You have received a Donor for the request of "${evt.name}"\n
         
         Donor Details: ${donor.Name}\n
         BloodType: ${donor.BloodType}\n
         Contact: ${donor.Contact}\n
         Address: ${donor.Address}
         Please check out the website for more information.\n
         Link: ${APP_URL}/requests/${evt.slug}

         
         
         
         `;
          console.log(mes);
          const phone = "+91" + evt.Phone;

          const res = await fetch(`${APP_URL}/api/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, mes }),
          });
          const data = await res.json();
          if (res.ok) {
            alert("Details has been Shared");
          } else {
            toast.error(data.message);
          }

          alert(`Thanks for Responding to ${evt.name}.`);
          router.push(`/`);
        }
      } else {
        return;
      }
      //console.log(user);
    }
  };










          
  

  return (
    <Layout title={router.query.slug}>
      <div className={styles.event}>
        <span>{new Date(evt.date).toLocaleDateString("en-UK")}</span>

        <h1>Contact Persons Name:{evt.name}</h1>
        <ToastContainer />
        {
          <div className="image">
            {
              <Image
                src={`/images/BloodTypes/${evt.BloodType}.jpg`}
                width={300}
                height={300}
                alt=""
              />
            }
          </div>
        }
        <h3>BloodType:</h3>
        <p>{evt.BloodType}</p>
        <h3>Units:</h3>
        <p>{evt.units}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue:{evt.venue}</h3>
        <p>{evt.address}</p>
        <h3>Contact Number:</h3>
        <p>{evt.Phone}</p>
        <br></br>
        <span>
          {" "}
          <button className="btn-secondary" onClick={handleRespond}>
            Respond to the Request
          </button>
          <p>
            <i>
              Responding to the request will share your details to the
              requester.
            </i>
          </p>
        </span>

        <Link href="/requests">
          <a className={styles.back}>{" <"}Go Back </a>
        </Link>
      </div>
    </Layout>
  );
}
/*
export async function getServerSideProps({query:{slug}})
{
  
  const res= await fetch(`${API_URL}/api/events/${slug}`);

  const events= await res.json()
  return{

    props:{
      evt:events[0],

    },

  }
}*/
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: {
      slug: evt.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);

  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
