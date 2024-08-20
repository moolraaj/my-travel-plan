'use client'

const TravelGallery = ({ result }) => {
  return (
    <div className="gallery">
      <h2>Passionate Paris With Disney 4N-5D</h2>
      <div className="images">
        {result === undefined || result === null ? (
          'No result found'
        ) : (
          result.map((ele, index) => (
            <div className="imageContainer" key={index}>
              {ele.packages_galleries === null ||
              ele.packages_galleries === undefined ||
              ele.packages_galleries.length === 0 ? (
                'No result found'
              ) : (
                <>
                  <div className="leftImage">
                    <img
                      src={`/uploads/${ele.packages_galleries[0].name}`}
                      alt="Large Image"
                      className="largeImage"
                    />
                  </div>
                  <div className="rightImages">
                    {ele.packages_galleries.slice(1, 3).map((e, idx) => (
                      <img
                        src={`/uploads/${e.name}`}
                        alt={`Image ${idx + 2}`}
                        key={idx}
                        className="smallImage"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TravelGallery;
