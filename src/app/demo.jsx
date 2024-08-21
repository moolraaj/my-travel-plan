


import Image from 'next/image';
import loader from '../../public/uploads/giphy.gif';

function Loading() {


  return (
    <>
      <div className="loading_wrapper">

        <Image src={loader.src}
          width={250}
          height={250}

        />

      </div>
    </>
  );
}

export default Loading;
