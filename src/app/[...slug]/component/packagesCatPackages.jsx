// 'use client'
// import { EXPORT_ALL_APIS } from '@/utils/apis/api'
// import React, { useEffect, useState } from 'react'

// function PackagesCatPackages({slug}) {
//     let api=EXPORT_ALL_APIS()
//     let [data,setData]=useState([])
//     let fetchSinglePackage=async()=>{
//         let resp=await api.loadSinglePackagesActivitiy(slug)
//         setData(resp)
//     }

//     useEffect(()=>{
//         fetchSinglePackage()
//     },[])
//     console.log('single activity data:',data)
//   return (
//     <div>
//       <h1>{slug}</h1>
//     </div>
//   )
// }

// export default PackagesCatPackages


'use client'
import { EXPORT_ALL_APIS } from '@/utils/apis/api'
import React, { useEffect, useState } from 'react'

function PackagesCatPackages({ slug }) {
    const api = EXPORT_ALL_APIS();
    const [data, setData] = useState([]);

    const fetchSinglePackage = async () => {
        try {
            const resp = await api.loadSinglePackagesActivitiy(slug);
            if (resp && resp.result) {
                setData(resp.result);
            } else {
                console.error('No data found or error in response:', resp);
            }
        } catch (error) {
            console.error('Error fetching single package:', error);
        }
    };

    useEffect(() => {
        fetchSinglePackage();
    }, [slug]);

    console.log('single activity data:', data);

   

    return (
        <div>
            <h1>{slug}</h1>
            <div>
                {data.map((item, index) => (
                    <div key={index}>
                        <h2>Category: {item.category.name}</h2>
                        <img src={item.category.image[0]?.path} alt={item.category.name} />
                        <h3>Packages:</h3>
                        <ul>
                            {item.packages.map(pkg => (
                                <li key={pkg.id}>
                                    <h4>{pkg.title}</h4>
                                    <img src={pkg.images[0]?.path} alt={pkg.title} />
                                    <p>{pkg.description}</p>
                                    <p>Price: {pkg.package_price}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PackagesCatPackages;
