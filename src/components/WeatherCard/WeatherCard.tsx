import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import weather from '../../../public/weather.png'
import axios from 'axios'
const WeatherCard = () => {
    const [location, setLocation] = useState({
        latitude: 2.2945,
        longitude: 48.8584
    });
    const [temp, setTemp] = useState(25);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });

        }
    }, [])
    useEffect(() => {
        async function changeTemp() {
            try {
                const result = await axios.get(
                    `/api/weather?lat=${location.latitude}&lon=${location.longitude}`
                );
                console.log(result)
                const data = result.data;
                if (data && data.main?.temp !== undefined) {
                    setTemp(Math.floor(data.main.temp));
                }
            } catch (error) {
                console.error("Failed to fetch temperature:", error);
            }
        }
        changeTemp();
    }, [location])

    return (
        <div className='h-[30vh] sm:h-[40vh] w-[90%] sm:w-[65%] lg:w-[45%] bg-linear-to-t from-[#1746EA] to-[#47BFDF] rounded-3xl flex justify-center items-center'>
            <div className='h-[100%] w-[70%] flex items-center  '>
                <Image src={weather} alt='sun clound image' className=' object-contain w-[48%] h-[100%]' />
                <p className=' text-white font-manrope  text-5xl sm:text-6xl right-0'>{temp} °C</p>
            </div>

        </div>
    )
}

export default WeatherCard