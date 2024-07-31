import TravelGallery from "./components/slider";

export default function page({params}) {
  let {slug}=params
 
 
  return (
    <div>
    
      <TravelGallery />
    </div>
  );
}
