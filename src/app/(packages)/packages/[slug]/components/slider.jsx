import Image from 'next/image';

const TravelGallery = () => {
  return (
    <div className="gallery">
      <h2>Passionate Paris With Disney 4N-5D</h2>
      <div className="images">
        <div className="image-container">
          <Image src="/imageone.png" alt="Image 1" width={300} height={200} />
        </div>
        <div className="image-container">
          <Image src="/imagetwo.png" alt="Image 2" width={300} height={200} />
        </div>
        <div className="image-container">
          <Image src="/imagethree.png" alt="Image 3" width={300} height={200} />
        </div>
      </div>     
    </div>
  );
};

export default TravelGallery;
