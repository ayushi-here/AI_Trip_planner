"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { Clock, ExternalLink, Star, Ticket, Wallet } from 'lucide-react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { title } from 'process';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { userTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

// const TRIP_DATA = {
//     "destination": "Dehradun",
//     "duration": "2 days",
//     "origin": "Haridwar",
//     "budget": "Moderate",
//     "group_size": "5 friends",
//     "hotels": [
//         {
//             "hotel_name": "Hotel Madhuban",
//             "hotel_address": "24, Rajpur Rd, Rajpur Colony, Dehradun, Uttarakhand 248001",
//             "price_per_night": "INR 3500",
//             "hotel_image_url": "https://www.hotelmadhuban.in/images/hotel.jpg",
//             "geo_coordinates": {
//                 "latitude": 30.3155,
//                 "longitude": 78.0322
//             },
//             "rating": 4.2,
//             "description": "A comfortable hotel with modern amenities situated close to the main market and transport hubs, ideal for groups."
//         },
//         {
//             "hotel_name": "Four Point by Sheraton Dehradun",
//             "hotel_address": "Rajpur Rd, Indira Nagar, Rajpur, Dehradun, Uttarakhand 248001",
//             "price_per_night": "INR 5500",
//             "hotel_image_url": "https://cache.marriott.com/marriottassets/marriott/DEDFP/four-points-dehradun-exterior-0217-hor-feat.jpg",
//             "geo_coordinates": {
//                 "latitude": 30.3163,
//                 "longitude": 78.0403
//             },
//             "rating": 4.5,
//             "description": "A reputed 4-star hotel offering premium comfort, ideal dining options, and excellent facilities for groups."
//         },
//         {
//             "hotel_name": "Hotel Sunpark Dehradun",
//             "hotel_address": "Near Clock Tower, Rajpur Road, Dehradun, Uttarakhand 248001",
//             "price_per_night": "INR 3200",
//             "hotel_image_url": "https://www.hotelsunpark.com/assets/images/sunpark-hotel.jpg",
//             "geo_coordinates": {
//                 "latitude": 30.3228,
//                 "longitude": 78.0389
//             },
//             "rating": 4,
//             "description": "A budget-friendly hotel located centrally in Dehradun with clean rooms and friendly staff."
//         }
//     ],
//     "itinerary": [
//         {
//             "day": 1,
//             "day_plan": "Explore iconic landmarks and enjoy nature in and around Dehradun.",
//             "best_time_to_visit_day": "8:00 AM to 6:00 PM",
//             "activities": [
//                 {
//                     "place_name": "Robber's Cave (Guchhupani)",
//                     "place_details": "A natural cave formation with a river running inside; a refreshing place for trekking and picnics.",
//                     "place_image_url": "https://www.tourmyindia.com/states/uttarakhand/images/robbers-cave-1.jpg",
//                     "geo_coordinates": {
//                         "latitude": 30.3255,
//                         "longitude": 78.0326
//                     },
//                     "place_address": "Robber's Cave Road, Dehradun, Uttarakhand",
//                     "ticket_pricing": "INR 20 per person",
//                     "time_travel_each_location": "30 minutes travel from city center",
//                     "best_time_to_visit": "Morning 8 AM to 11 AM"
//                 },
//                 {
//                     "place_name": "Sahastradhara",
//                     "place_details": "Famous for its sulphur springs, beautiful waterfalls, and scenic views, relaxing for an afternoon visit.",
//                     "place_image_url": "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/07/08/857669-sahastradhara-dehradun.jpg",
//                     "geo_coordinates": {
//                         "latitude": 30.3004,
//                         "longitude": 78.0101
//                     },
//                     "place_address": "Sahastradhara, Dehradun, Uttarakhand",
//                     "ticket_pricing": "INR 30 per person",
//                     "time_travel_each_location": "40 minutes from Robber's Cave",
//                     "best_time_to_visit": "Afternoon 2 PM to 5 PM"
//                 }
//             ]
//         },
//         {
//             "day": 2,
//             "day_plan": "Cultural immersion and nature sightseeing around Dehradun.",
//             "best_time_to_visit_day": "8:00 AM to 6:00 PM",
//             "activities": [
//                 {
//                     "place_name": "Forest Research Institute",
//                     "place_details": "Historic institute with British colonial architecture and beautiful surrounding gardens.",
//                     "place_image_url": "https://www.fri.res.in/sites/default/files/header/Fri-Building.jpg",
//                     "geo_coordinates": {
//                         "latitude": 30.3214,
//                         "longitude": 78.0329
//                     },
//                     "place_address": "Forest Research Institute, Dehradun, Uttarakhand",
//                     "ticket_pricing": "INR 30 per person",
//                     "time_travel_each_location": "10 minutes from city center",
//                     "best_time_to_visit": "Morning 9 AM to 12 PM"
//                 },
//                 {
//                     "place_name": "Mindrolling Monastery",
//                     "place_details": "One of the largest Buddhist centers in India, known for its beautiful gardens and architecture.",
//                     "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mindrolling_Monastery.jpg",
//                     "geo_coordinates": {
//                         "latitude": 30.2572,
//                         "longitude": 78.0687
//                     },
//                     "place_address": "Manglour, Dehradun, Uttarakhand",
//                     "ticket_pricing": "Free entry",
//                     "time_travel_each_location": "40 minutes from Forest Research Institute",
//                     "best_time_to_visit": "Afternoon 1 PM to 4 PM"
//                 }
//             ]
//         }
//     ]
// }

function Itinerary() {
    //@ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = userTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null)

    useEffect(() => {
        tripDetailInfo && setTripData(tripDetailInfo)
    },)

    const data = tripData ? [
        {
            title: "Recommended Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {tripData?.hotels.map((hotel, index) => (
                        <HotelCardItem hotel={hotel} />
                    ))}
                </div>
            ),
        },
        ...tripData?.itinerary.map((dayData) => ({
            title: `Day ${dayData?.day}`,
            content: (
                <div >
                    <p className='mb-2 font-bold text-xl text-primary'>Best Time:{dayData?.best_time_to_visit_day}</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {dayData?.activities.map((activity, index) => (
                            <PlaceCardItem activity={activity} />
                        ))}
                    </div>
                </div>
            )
        }))
    ] : [];
    return (
        <div className="relative w-full h-[80vh] overflow-auto">
            {tripData && <Timeline data={data} tripData={tripData} />}
        </div>
    )
}

export default Itinerary