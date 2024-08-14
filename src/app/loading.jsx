'use client';


import Image from 'next/image';
import loader from '../../public/uploads/airplane.gif';

function Loading() {


  return (
    <>
      <div className="loading_wrapper">

        <Image src={loader.src}
          width={180}
          height={180}

        />

      </div>
    </>
  );
}

export default Loading;
