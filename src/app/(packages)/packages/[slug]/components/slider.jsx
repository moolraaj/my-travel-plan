import Image from 'next/image';

const TravelGallery = () => {
  return (
    <div className="gallery">
      <h2>Passionate Paris With Disney 4N-5D</h2>
      <div className="images">
        <div className="image-container">
          <img src="/images/innerone.png" alt="Image 1" />
        </div>
        <div className="image-container">
          <img src="/images/innertwo.png" alt="Image 2"/>
        </div>
        <div className="image-container">
          <img src="/images/innerthree.png" alt="Image 3"/>
        </div>
      </div>     
    </div>
  );
};

export default TravelGallery;
