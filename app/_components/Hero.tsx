"use client"
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Globe2, Plane, Send, Mountain, Map, ArrowDown } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const suggestions = [
    {
        title: 'Create New Trip',
        icon: <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title: 'Inspire me where to go',
        icon: <Plane className='text-green-400 h-5 w-5' />
    },
    {
        title: 'Discover Hidden gems',
        icon: <Mountain className='text-orange-400 h-5 w-5' />
    },
    {
        title: 'Adventure Destination',
        icon: <Map className='text-blue-400 h-5 w-5' />
    }
]

function Hero() {

    const {user} =useUser();
    const router=useRouter();
    const onSend=()=>{
        if(!user)
        {
            router.push('/sign-in')
            return;
        }
        //Navigate to Create Trip Planner Web Page
        router.push('/create-new-trip')
    }

    return (
        <div className='mt-24 w-full flex justify-center'>
            {/* Content */}
            <div className='max-w-3xl w-full text-center space-y-6'>
                <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal <span className='text-primary'>Trip Planner</span></h1>
                <p className='text-lg'>Tell me where you wanna go, and I'll handle the rest: Trip planning, Flights, Hotels - all in seconds.</p>
                {/* Input Box */}
                <div>
                    <div className='border rounded-2xl p-4 shadow relative'>
                        <Textarea
                            placeholder='Create a trip for Paris from New York'
                            className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                        />
                        <Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
                            <Send className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

                {/* Suggestion List */}
                <div className='flex gap-5 justify-center flex-wrap'>
                    {suggestions.map((suggestions, index) => (
                        <div key={index} className='flex items-center gap-2 border rounded-full cursor-pointer hover:bg-primary hover:text-white'>
                            {suggestions.icon}
                            <h2 className='text-sm'>{suggestions.title}</h2>
                        </div>
                    ))}
                </div>
                {/* <div className='flex items-center justify-center flex-col'>
                    <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start? <strong>See how it works</strong><ArrowDown /></h2>
                    {/* Video Section */}
                    {/* <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div> */}

            </div>
        </div>
    )
}

export default Hero