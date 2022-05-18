import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import Link from "next/link";

import BloodCamps from "../../components/BloodCamps";
const PER_PAGE = 8;

import Search from "../../components/Search";
export default function CampsPage({ camps, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <div className="divide">
        <h1>Upcoming Blood Donation Camps</h1>
        <Search></Search>
        {camps.length !== 0 ? (
          <>
            {camps.map((evt) => (
              <BloodCamps key={evt.id} evt={evt} />
            ))}
          </>
        ) : (
          <>
            <h2>No Blood Donation Camps</h2>
          </>
        )}

        <div>
          {page > 1 && (
            <Link href={`/camps?page=${page - 1}`}>
              <a className="btn-secondary">Prev</a>
            </Link>
          )}

          {page < lastPage && (
            <Link href={`/camps?page=${page + 1}`}>
              <a className="btn-secondary">Next</a>
            </Link>
          )}

          <div>
            <br></br>
            <Link href="/">&lt;Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  //fetching count
  const totalRes = await fetch(`${API_URL}/blood-donation-camps/count`);

  const total = await totalRes.json();

  //fetching requests
  const requestRes = await fetch(
    `${API_URL}/blood-donation-camps?_sort=Date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );

  const camps = await requestRes.json();

  return {
    props: { camps, page: +page, total },
  };
}
