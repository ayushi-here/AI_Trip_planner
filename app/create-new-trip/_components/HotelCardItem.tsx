"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Star, Wallet } from 'lucide-react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Hotel } from './ChatBox';

type Props = {
    hotel: Hotel
}

function HotelCardItem({ hotel }: Props) {

    const [photoUrl,setPhotoUrl]=useState<string>();
    useEffect(() => {
        hotel&&GetGooglePlaceDetail();
    }, [hotel])

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: hotel?.hotel_name
        });
        if(result?.data?.e){
            return;
        }
        setPhotoUrl(result?.data);
    }

    return (
        <div className='flex flex-col gap-1'>

            <div className='relative w-full h-48'>
                <Image
                src={photoUrl?photoUrl:'/placeholder.jpg'}
                alt={hotel?.hotel_name || 'Hotel Image'}
                fill
                className='object-cover'
                />
            </div>
            <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
            <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>

            <div className='flex justify-between items-center'>
                <p className='flex gap-2 text-green-600'><Wallet />{hotel?.price_per_night}</p>
                <p className='text-yellow-500 flex gap-2'><Star />{hotel?.rating}</p>
            </div>

            <Link href={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name} target='_blank'>
                <Button variant={'outline'} className='mt-1 w-full'>View</Button>
            </Link>
            {/* <p className='line-clamp-2 text-gray-500'>{hotel?.description}</p> */}
        </div>
    )
}

export default HotelCardItem