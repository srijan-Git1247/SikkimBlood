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

export default function EventPage({ evt }) {
  const router = useRouter();
  

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
        <span> <button className="btn-secondary">Respond to the Request</button><p><i>Responding to the request will share your data to the requester.</i></p></span>
       
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
