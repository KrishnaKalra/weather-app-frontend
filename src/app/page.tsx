'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from '../components/Header/Header'
import { useRouter } from "next/navigation";
import WeatherCard from "@/components/Weather Card/WeatherCard";
import moment from 'moment'

export default function Home() {
  interface User {
    name?: string,
    phoneno?: number,
    email?: string
  }

  const router = useRouter();
  const [name, setName] = useState('')
  const [greeting,setGreeting]=useState("Good Morning");
  useEffect(() => {
    if (localStorage.getItem('user') == null)
      router.replace('/login');
    let user= localStorage.getItem('user');
    if (user) {
      const parsedUser: User = JSON.parse(user);
      if (parsedUser.name) {
        setName(parsedUser.name.split(" ")[0]);
      }
    }

    moment.locale();
    const curTime=moment().format('LT');
    if(curTime.split(" ")[2]=="AM"&&Number(curTime.split(":")[1])>=5)
      setGreeting("Good Morning")
    else if(curTime.split(" ")[2]=="PM"&&Number(curTime.split(":")[1])>=3)
      setGreeting("Good Afternoon")
    else
      setGreeting("Good Evening")
    
  }, [])

  return (
    <div >
      <Header />
      <div className="flex mt-20 sm:m-0 sm:justify-center items-center flex-col w-[100vw] h-[100vh]">
        <p className="text-3xl mb-2 font-semibold text-center font-manrope">{greeting}, {name} </p>
        <p className="text-xl mb-10 font-manrope text-centergit text-[#687588]">Here is the weather update for you</p>
        <div className=" w-[100vw] flex justify-center items-center">

          <WeatherCard />
        </div>
      </div>
    </div>
  );
}
