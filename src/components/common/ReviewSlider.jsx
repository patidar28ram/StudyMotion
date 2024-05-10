import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating", data);

            if(data?.success) {
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


  return (
    <div className='text-white'>
        <div className='h-[190px] max-w-maxContent'>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className='w-full'
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}
                            className='m-4'
                        >
                            <img
                            src={review?.user?.image
                             ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                              alt='Profile Pic'
                              className='h-9 w-9 object-cover rounded-full'
                            />
                            <p>Student <span>{review?.user?.firstName} {review?.user?.lastName}</span> </p>
                            <p> Course {review?.course?.courseName}</p>
                            <p>
                                Review {review?.review}
                            </p>
                            <p className='text-sm text-richblack-5'>Rating {review?.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider
