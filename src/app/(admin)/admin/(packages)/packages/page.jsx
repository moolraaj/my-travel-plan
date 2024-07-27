
// // /app/(admin)/admin/(packages)/packages/page.jsx

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// function Packages() {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchPackages() {
//       try {
//         const response = await fetch('/api/v1/packages/get');
//         const data = await response.json();
//         if (data.success) {
//           setPackages(data.result);
//         }
//       } catch (error) {
//         console.error('Error fetching Packages:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPackages();
//   }, []);

//   const handleAddClick = () => {
//     router.push('/admin/packages/add-packages');
//   };



//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         const response = await fetch(`/api/v1/package/delete/${id}`, { method: 'DELETE' });
//         const data = await response.json();
//         if (data.success) {
//           setPackages(packages.filter(packages => packages._id !== id));
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         setError('Failed to delete package, please try again.');
//       }
//     }
//   };

//   return (
//     <div className="packages">
//       <h2>Packages</h2>
//       {error && <div className="error">{error}</div>}
//       <div className="packages-table-container">
//         <div></div>
//         <table className="packages-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Countries Count</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="loading">Loading...</td>
//               </tr>
//             ) : (
//                 packages.map(packages => (
//                 <tr key={packages._id}>
//                   <td data-label="Image">
//                     <img 
//                       src={`/uploads/${packages.images[0].name}`} 
//                       alt={packages.title} 
//                       className="package-image" 
//                     />
//                   </td>
//                   <td data-label="Title">{packages.title}</td>
//                   <td data-label="Description">{packages.description}</td>
//                   <td data-label="Countries Count">{packages.totalPackages}</td>
//                   <td data-label="Actions" className="actions">
//                     <FaEye className="action-icon view" title="View" />
//                     <FaEdit className="action-icon edit" title="Edit"  />
//                     <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(packages._id)} />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="floating-plus" onClick={handleAddClick}>
//         <FaPlus />
//         <div className="tooltip">Add package</div>
//       </div>
//     </div>
//   );
// }

// export default Packages;



'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/v1/packages/get');
        const data = await response.json();
        if (data.success) {
          setPackages(data.result);
        }
      } catch (error) {
        console.error('Error fetching Packages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const handleAddClick = () => {
    router.push('/admin/packages/add-packages');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected packages?')) {
      try {
        for (const id of selectedPackages) {
          await fetch(`/api/v1/package/delete/${id}`, { method: 'DELETE' });
        }
        setPackages(packages.filter(pkg => !selectedPackages.includes(pkg._id)));
        setSelectedPackages([]);
        setSelectAll(false);
      } catch (error) {
        setError('Failed to delete packages, please try again.');
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedPackages(packages.map(pkg => pkg._id));
    } else {
      setSelectedPackages([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter(pkgId => pkgId !== id));
    } else {
      setSelectedPackages([...selectedPackages, id]);
    }
  };

  return (
    <div className="packages">
      <h2>Packages</h2>
      {selectedPackages.length > 0 && (
        <div className="action-bar">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="select-all-checkbox"
          />
          <FaTrashAlt className="action-bar-icon" onClick={handleDelete} title="Delete Selected" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <div className="packages-table-container">
        <div></div>
        <table className="packages-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Countries Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading">Loading...</td>
              </tr>
            ) : (
              packages.map(pkg => (
                <tr key={pkg._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg._id)}
                      onChange={() => handleSelect(pkg._id)}
                    />
                  </td>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${pkg.images[0].name}`} 
                      alt={pkg.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="Title">{pkg.title}</td>
                  <td data-label="Description">{pkg.description}</td>
                  <td data-label="Countries Count">{pkg.totalPackages}</td>
                  <td data-label="Actions" className="actions">
                    <FaEye className="action-icon view" title="View" />
                    <FaEdit className="action-icon edit" title="Edit" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="floating-plus" onClick={handleAddClick}>
        <FaPlus />
        <div className="tooltip">Add package</div>
      </div>
    </div>
  );
}

export default Packages;
