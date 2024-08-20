'use client'

const TravelGallery = ({ result }) => {
  console.log('awerwrwerwerwreewr',result)
  return (
    <div className="gallery">
      
      
        {result === undefined || result === null ? (
          'No result found'
        ) : (
          result.map((ele, index) => (
            <>
            <h2>{ele.title}</h2>
            <div className="images">
            <div className="imageContainer" key={index}>
              {ele.packages_galleries === null ||
              ele.packages_galleries === undefined ||
              ele.packages_galleries.length === 0 ? (
                ''
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
            </div>
            </>
            
          ))
        )}
    </div>
  );
};

export default TravelGallery;
