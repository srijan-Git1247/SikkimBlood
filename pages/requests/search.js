import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import RequestItem from "../../components/RequestItem";
import qs from "qs";
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">

      
      <Link href="/requests">Previous Page</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events === 0 && <h1>No Requests</h1>}

      {events.map((evt) => (
        <RequestItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { units_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}