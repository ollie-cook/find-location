import Map from "./components/Map";
import Game from "./components/Game"
import newTubeStations from "@/app/utils/newTubeStations";

export const dynamic = 'force-dynamic'

export default function Home() {
  let startIndex = Math.floor(Math.random() * newTubeStations.length);
  let goalIndex = Math.floor(Math.random() * newTubeStations.length);

  let startCoords = {
    lat: newTubeStations[startIndex].geometry.coordinates[1],
    lng: newTubeStations[startIndex].geometry.coordinates[0]
  }

  
  let goalCoords = {
    lat: newTubeStations[goalIndex].geometry.coordinates[1],
    lng: newTubeStations[goalIndex].geometry.coordinates[0]
  }

  return (
    <main className="relative flex flex-col justify-center items-center min-h-screen">
      <h1 className="absolute top-2 text-6xl font-bold text-[#112d81]">Tfl Locate</h1>
      <Game name={newTubeStations[goalIndex].properties.name} center={startCoords} goal={goalCoords}/>
    </main>
  );
}
