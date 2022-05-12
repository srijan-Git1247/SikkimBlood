import React from "react";
import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import Link from "next/link";
import RequestItem from "../../components/RequestItem";
const PER_PAGE=8;

import Search from "../../components/Search";
export default function EventsPage({ events,page,total}) {



  const lastPage=Math.ceil(total/PER_PAGE);
  return (
    <Layout>
      
      <h1>Active Requirements</h1>
      <Search></Search>
      {events === 0 && <h1>No Requests</h1>}

      {events.map((evt) => (
        <RequestItem key={evt.id} evt={evt} />
      ))}
      <div>
      {page>1&& (
        <Link href={`/events?page=${page-1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )
      }
      
      {page<lastPage&& (
        <Link href={`/events?page=${page+1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )
      }
      <div><br></br><Link href="/camps">&lt;Donate Via a Blood Donation Camp</Link></div>
      
      <div><br></br><Link href="/">&lt;Home</Link></div>
     
      
      </div>
      
      
    </Layout>
  );
}
export async function getServerSideProps({query:{page=1}}) {


  const start=+page===1?0:(+page-1)*PER_PAGE
//fetching count
const totalRes = await fetch(`${API_URL}/events/count`);
  

  const total = await totalRes.json();


  //fetching requests
  const requestRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  
  
  const events = await requestRes.json();

  return {
    props: { events,page:+page,total},
  };
}