
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import styles from "../../styles/Request.module.css";
import styles2 from "../../styles/CampForm.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export default function CampPage({ evt }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name:"",
    phone:""
  })
  let Peeps={People:{}}
  //converting time (substring)
  let time=evt.Time.toString();
  time=time.substring(0,5);

  const[Form,showForm]=useState(false);

  const handleRegister=()=>
  {
    showForm(true);


  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all the fields");
      
      return;
    }
    
    const{name,phone}=values;

    if(confirm("Do you want to register for this blood camp?"))
    {
      const res = await fetch(`${API_URL}/blood-donation-camps/${evt.id}`, {
        method: "GET",
       
      });
      const data= await res.json();
      
    
      let person={name:name,contact:phone}
      
      if(data.People===null)
      {
        data.People=[];
      }
      data.People.push(person);
     

      
     
    const register = await fetch(`${API_URL}/blood-donation-camps/${data.id}`, {
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
      alert(
        `Thanks for registering for ${data.Name}.`
      );
      router.push(`/`);
    }



    }
    else{
      return;
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };




  return (
    <Layout title={router.query.slug}>
      <div className={styles.event}>
        

        <span>
          {new Date(evt.Date).toLocaleDateString("en-UK")} 
        </span>

        <h1>{evt.Name}</h1>
        <ToastContainer />
        {
          <div className="image">
            { evt.image!==null?<Image src={evt.image.url} width={660} height={300}  alt=""  />:<Image src={"/images/Blood-Donation-Transparent-Background.png"} width={660} height={300} alt=""  />}
           
          </div>
        }
        
        <p>{evt.units}</p>
        <h3>Description:</h3>
        <p>{evt.Description}</p>
        <h3>Address:{evt.Address}</h3>
        <p>{evt.address}</p>
        <h3>Contact Details:</h3>
        <p>{evt.ContactNumber}</p>

        <button className="btn-secondary" onClick={handleRegister}>Register</button>
        {Form===true?<><br></br><br></br><br></br>
          <form className={styles2.form} onSubmit={handleSubmit} >
            <fieldset className>
            <legend className>
          Your Details:
            </legend>
        <div className={styles2.grid}>
          <div>
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Full Name"
              value={values.name}
              onChange={handleInputChange}
              
              
            ></input>
            
          </div>
          <div>
            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter Your 10 Digit Phone Number"
              value={values.phone}
              pattern="[0-9]{10}"
            
              onChange={handleInputChange}

              
            ></input>
            
          </div>
        </div>

        <input type="submit" value="Register for the Camp" className="btn"></input>&nbsp;
        
       
        </fieldset>
      </form>
     
        </>
        
        :
        <></>}

        <Link href="/camps">
          <a className={styles.back}>{" <"}Go Back </a>
        </Link>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/blood-donation-camps`);
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
  const res = await fetch(`${API_URL}/blood-donation-camps?slug=${slug}`);

  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}