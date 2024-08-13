'use client';

 
import { Blocks } from 'react-loader-spinner';

function Loading() {
   

  return (
    <>
      <div className="loading_wrapper">
        
          <Blocks
            height="180"
            width="180"
            color="#000"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        
      </div>
    </>
  );
}

export default Loading;
