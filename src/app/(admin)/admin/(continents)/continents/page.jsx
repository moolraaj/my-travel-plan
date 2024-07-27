
// // /app/(admin)/admin/(continents)/continent/page.jsx

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

// function ContinentPage() {
//   const [continents, setContinents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchContinents() {
//       try {
//         const response = await fetch('/api/v1/continents/get');
//         const data = await response.json();
//         if (data.success) {
//           setContinents(data.result);
//         }
//       } catch (error) {
//         console.error('Error fetching continents:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchContinents();
//   }, []);

//   const handleAddClick = () => {
//     router.push('/admin/continents/add-continent');
//   };



//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this package?')) {
//       try {
//         const response = await fetch(`/api/v1/continent/delete/${id}`, { method: 'DELETE' });
//         const data = await response.json();
//         if (data.success) {
//           setContinents(continents.filter(continent => continent._id !== id));
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
//       <h2>Continents</h2>
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
//               continents.map(continent => (
//                 <tr key={continent._id}>
//                   <td data-label="Image">
//                     <img 
//                       src={`/uploads/${continent.images[0].name}`} 
//                       alt={continent.title} 
//                       className="package-image" 
//                     />
//                   </td>
//                   <td data-label="Title">{continent.title}</td>
//                   <td data-label="Description">{continent.description}</td>
//                   <td data-label="Countries Count">{continent.countriesCount}</td>
//                   <td data-label="Actions" className="actions">
//                     <FaEye className="action-icon view" title="View" />
//                     <FaEdit className="action-icon edit" title="Edit"  />
//                     <FaTrashAlt className="action-icon delete" title="Delete" onClick={() => handleDelete(continent._id)} />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="floating-plus" onClick={handleAddClick}>
//         <FaPlus />
//         <div className="tooltip">Add Continent</div>
//       </div>
//     </div>
//   );
// }

// export default ContinentPage;




'use client';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ContinentPage() {
  const [continents, setContinents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchContinents() {
      try {
        const response = await fetch('/api/v1/continents/get');
        const data = await response.json();
        if (data.success) {
          setContinents(data.result);
        }
      } catch (error) {
        console.error('Error fetching continents:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContinents();
  }, []);

  const handleAddClick = () => {
    router.push('/admin/continents/add-continent');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected continents?')) {
      try {
        for (const id of selectedContinents) {
          await fetch(`/api/v1/continent/delete/${id}`, { method: 'DELETE' });
        }
        setContinents(continents.filter(continent => !selectedContinents.includes(continent._id)));
        setSelectedContinents([]);
        setSelectAll(false);
      } catch (error) {
        setError('Failed to delete continents, please try again.');
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedContinents(continents.map(continent => continent._id));
    } else {
      setSelectedContinents([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedContinents.includes(id)) {
      setSelectedContinents(selectedContinents.filter(continentId => continentId !== id));
    } else {
      setSelectedContinents([...selectedContinents, id]);
    }
  };

  return (
    <div className="packages">
      <h2>Continents</h2>
      {selectedContinents.length > 0 && (
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
              continents.map(continent => (
                <tr key={continent._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      checked={selectedContinents.includes(continent._id)}
                      onChange={() => handleSelect(continent._id)}
                    />
                  </td>
                  <td data-label="Image">
                    <img 
                      src={`/uploads/${continent.images[0].name}`} 
                      alt={continent.title} 
                      className="package-image" 
                    />
                  </td>
                  <td data-label="Title">{continent.title}</td>
                  <td data-label="Description">{continent.description}</td>
                  <td data-label="Countries Count">{continent.countriesCount}</td>
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
        <div className="tooltip">Add Continent</div>
      </div>
    </div>
  );
}

export default ContinentPage;
