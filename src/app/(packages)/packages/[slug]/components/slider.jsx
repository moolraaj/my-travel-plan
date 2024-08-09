import Image from 'next/image';

const TravelGallery = ({ result }) => {

  return (
    <div className="gallery packages-innerpage">
      <h2>Passionate Paris With Disney 4N-5D</h2>
      <div className="images">
        {result === undefined || result === null ? ('no result found') : (result.map((ele, index) => {
          return <div className="image-container" key={index}>
            {ele.packages_galleries === null || ele.packages_galleries === undefined||ele.packages_galleries.length===0 ? ('no result found') : (ele.packages_galleries.slice(0,3).map((e, index) => {
              return <img src={`uploads/${e.name}`} alt="Image 1" key={index}/>

            }))}
          </div>
        }))}
       
      </div>
    </div>
  );
};

export default TravelGallery;
