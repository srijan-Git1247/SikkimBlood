import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import Link from "next/link";

import BloodCamps from "../../components/BloodCamps";
const PER_PAGE=4;

import Search from "../../components/Search";
export default function CampsPage({ events,page,total}) {



  const lastPage=Math.ceil(total/PER_PAGE);
  
  return (
    <Layout>
      <div className="divide">
      
      <h1>Upcoming Blood Donation Camps</h1>
      {events.length!==0?(
    <>
      {events.map((evt) => (
          <BloodCamps key={evt.id} evt={evt} />
      ))}
    </>):
    (
      <>
        <h1>No requests</h1>
      </>
    )}
      <div>
      {page>1&& (
        <Link href={`/camps?page=${page-1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )
      }
      
      {page<lastPage&& (
        <Link href={`/camps?page=${page+1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )
      }
     
      <div><br></br><Link href="/">&lt;Home</Link></div>
      
      </div>
      </div>
      
    </Layout>
  );
}
export async function getServerSideProps({query:{page=1}}) {


  const start=+page===1?0:(+page-1)*PER_PAGE
//fetching count
const totalRes = await fetch(`${API_URL}/blood-donation-camps/count`);
  

  const total = await totalRes.json();


  //fetching requests
  const requestRes = await fetch(`${API_URL}/blood-donation-camps?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  
  
  const events = await requestRes.json();

  return {
    props: { events,page:+page,total},
  };
}