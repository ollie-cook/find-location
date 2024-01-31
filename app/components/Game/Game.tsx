'use client'

import { useState, useEffect } from "react"
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
  const [found, setFound] = useState(false);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer == null) {
      setTimer(setInterval(() => {
        setTime((time) => time + 0.1)
      }, 100))
    }

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  useEffect(() => {
    if (found == true) {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [found])

  const refresh = () => {
    setFound(false)
    window.location.reload();
  }

  return (
    <>
      <div className="relative flex flex-col items-center w-1/2 ">
        <p className="absolute bottom-1 left-1 text-sm">Timer: <span className="text-xl font-semibold font-mono">{time.toFixed(1)}</span> seconds</p>
        <h2>Find the station: <span className="text-lg font-bold">{props.name}</span></h2>
        <p className="text-sm">Click on the red marker <FaLocationDot className="inline mb-1" style={{color: 'red'}} /> when you find it</p>
        <button 
          className="absolute bottom-1 right-1 px-1 py-0.5 rounded-md bg-[#fecd00] hover:bg-[#cca300]"
          onClick={refresh}
        >
          New station
          <IoIosRefresh className="inline mb-0.5 ml-1" />
        </button>
      </div>
      <div className="relative w-1/2 h-[70vh] mt-2">
        <Map center={props.center} goal={props.goal} setFound={(value: boolean) => setFound(value)}/>
        {
          found == true && (
            <div className="absolute rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-1/3 w-1/2 bg-lime-600 ">  
              <p>Well done!</p>
              <p>You found <span className="text-lg font-bold">{props.name}</span> in {time.toFixed(1)} seconds</p>
              <button 
                className="px-1 py-0.5 mt-2 rounded-md bg-orange-300 hover:bg-orange-400"
                onClick={refresh}
              >
                Play again
                <IoIosRefresh className="inline mb-0.5 ml-1" />
              </button>
            </div>
          )
        }
      </div>
    </>
  )
}