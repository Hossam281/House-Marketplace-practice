import { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrowIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listing,setListing]=useState(null)
  const [loading,setLoading]=useState(true)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onSubmit = async () => {
    try {
     if(auth.currentUser.displayName !== name){
      await updateProfile(auth.currentUser,{
        displayName:name
      })
     }
     
     
     const userRef=doc(db,'users',auth.currentUser.uid)
     await updateDoc(userRef,{
      name
      

     })
    } catch (error) {
      toast.error('Something Went Wrong ')
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  

  useEffect(()=>{
    const fetchUser=async()=>{
      const listingRef=collection(db,'listing')

      const q=query(listingRef,where('userRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))
      const getQuery=await getDocs(q)

      const listings=[]

      getQuery.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data:doc.data()
        })
      })

      setListing(listings)
      setLoading(false)
    }

    fetchUser()
  },[auth.currentUser.uid])

  const onDelete=async(docId)=>{
    if(window.confirm('Please Confrim Deletion')){
      const docRef=doc(db,'listing',docId)
      await deleteDoc(docRef)

      const updatedListing= listing.filter((doc)=>doc.id !==docId)

      setListing(updatedListing)

      toast.success('Successfully Deleted !')

    }
  }
  const onEdit=(itemId)=>{
    navigate(`/edit-listing/${itemId}`)
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" onClick={onLogout} className="logOut">
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>
        <div className="profileCard">
          <input
            type="text"
            id="name"
            className={!changeDetails ? "profileName" : "profileNameActive"}
            disabled={!changeDetails}
            value={name}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            className= "profileEmail" 
            disabled={true}
            value={email}
            onChange={handleChange}
          />
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home" />
            <p>Sell / Rent House</p>
          <img src={arrowIcon} alt="arrow" />  
        </Link>

        {!loading&& listing?.length>0 && (
          <>
          <p className="listingText">Your Listings</p>
          <ul className="listingList">
            {listing.map((item)=>(
              <ListItem key={item.id} listing={item.data} id={item.id} onDelete={()=>onDelete(item.id)} onEdit={()=>onEdit(item.id)} />
            ))}
          </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
