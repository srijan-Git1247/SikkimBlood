import Layout from "../components/Layout";
import PhotoGrid from "../components/PhotoGrid";
import Link from "next/link";

export default function AboutPage() {
  return (
    <Layout title="About Blood Donation">
      <div className="divide">
      <h1>About</h1>
      <p>&copy;Sikkim Blood 2022</p>
      <p>Version 1.0.0</p>
      <p><Link href="https://nedevelopers.in/" >
          <a>Ne developers &nbsp;<br/>Contact: +91-9894178970<br/>
        Address: Opp. State Bank of Sikkim
        Metro point, Tadong Gangtok, East Sikkim
        737102</a>
        </Link></p>
        <br/>
        <h1>Support Partners</h1>
        <p>
        On our journey to make the society lively and healthy, <br/>we would also
        like to thank our support partners for the great assistance.
      </p>
      <div>
        <PhotoGrid evt={"/images/SupportPartners/bloodarmy.jpg"} />  
        <PhotoGrid evt={"/images/SupportPartners/runners.jpg"} /> 
        <PhotoGrid evt={"/images/SupportPartners/Aakraman.jpg"} />
        <PhotoGrid evt={"/images/SupportPartners/Friends.jpg"} />
        <PhotoGrid evt={"/images/SupportPartners/Taas.jpg"} />
        <PhotoGrid evt={"/images/SupportPartners/vbdas.jpg"} />
        <PhotoGrid evt={"/images/SupportPartners/sai.jpg"} />
        <PhotoGrid evt={"/images/SupportPartners/Comp.png"} />
        
      </div>
      </div>
      
    </Layout>
  );
}