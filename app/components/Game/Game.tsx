'use client'

import { useState } from "react"
import Map from "../Map"
import { FaLocationDot } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";

interface GameProps {
  name: string;
  center: {
    lat: number;
    lng: number;
  }
  goal: {
    lat: number;
    lng: number;
  }
}

export default function Game(props: GameProps) {
  const [found, setFound] = useState(false)

  const refresh = () => {
    setFound(false)
    window.location.reload();
  }

  return (
    <>
      <div className="relative flex flex-col items-center w-1/2 ">
        <h2>Find the station: <span className="text-lg font-bold">{props.name}</span></h2>
        <p className="text-sm">Click on the red marker <FaLocationDot className="inline mb-1" style={{color: 'red'}} /> when you find it</p>
        <button 
          className="absolute bottom-1 right-1 px-1 py-0.5 rounded-md bg-orange-300 hover:bg-orange-400"
          onClick={refresh}
        >
          New station
          <IoIosRefresh className="inline mb-0.5 ml-1" />
        </button>
      </div>
      <div className="w-1/2 h-[70vh] mt-2">
        <Map center={props.center} goal={props.goal} setFound={(value: boolean) => setFound(value)}/>
      </div>
      {
        found == true && (
          <p>Station found!</p>
        )
      }
    </>
  )
}