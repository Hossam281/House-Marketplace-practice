import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

const Slider = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listRef = collection(db, "listing");
      const q = query(listRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listing = [];

      querySnap.forEach((element) => {
        return listing.push({
          id: element.id,
          data: element.data(),
        });
      });
      
      setListing(listing);
      setLoading(false);
    };

    fetchListing()
  }, []);


  if(loading){
    return <Spinner/>
  }
  if(listing.length <=0){
    return <></>
  }
  return listing&&(
    <>
    <p className="exploreHeading">Recommended</p>

    <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  {data.discountedPrice ?? data.regularPrice} &nbsp; EGP{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </>
  )
};

export default Slider;
