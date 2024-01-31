import Map from "./components/Map";
import Game from "./components/Game"
import newTubeStations from "@/app/utils/newTubeStations";


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
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Game name={newTubeStations[goalIndex].properties.name} center={startCoords} goal={goalCoords}/>
    </main>
  );
}
