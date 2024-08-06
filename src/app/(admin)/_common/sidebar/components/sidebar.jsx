
// // /app/(admin)/_common/header/components/sidebar.jsx  

// 'use client';
// import React from 'react';
// import './sidebar.css'; // Import the global CSS
// import Link from 'next/link';
// import { FaTachometerAlt, FaGlobe, FaFlag, FaCity, FaTag, FaUsers, FaCog, FaFileAlt, FaCalendarCheck,FaAddressBook,FaPenAlt} from 'react-icons/fa';

// function Sidebar({ isOpen, toggleSidebar }) {
//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <button className="close-btn" onClick={toggleSidebar}>
//         &times;
//       </button>
//       <div className="sidebar-content">
//         <h2>Admin Sidebar</h2>
//         <ul>
//           <li>
//             <Link href="/admin/dashboard" onClick={toggleSidebar}>
//               <FaTachometerAlt className="sidebar-icon" />
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/continents" onClick={toggleSidebar}>
//               <FaGlobe className="sidebar-icon" />
//               Continents
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/countries" onClick={toggleSidebar}>
//               <FaFlag className="sidebar-icon" />
//               Countries
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/cities" onClick={toggleSidebar}>
//               <FaCity className="sidebar-icon" />
//               Cities
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/packages" onClick={toggleSidebar}>
//               <FaTag className="sidebar-icon" />
//               Packages
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/blog" onClick={toggleSidebar}>
//               <FaPenAlt className="sidebar-icon" />
//               Blogs
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/contacts" onClick={toggleSidebar}>
//               <FaAddressBook className="sidebar-icon" />
//               Contacts
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/users" onClick={toggleSidebar}>
//               <FaUsers className="sidebar-icon" />
//               Users
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/bookings" onClick={toggleSidebar}>
//               <FaCalendarCheck className="sidebar-icon" />
//               Bookings
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/settings" onClick={toggleSidebar}>
//               <FaCog className="sidebar-icon" />
//               Settings
//             </Link>
//           </li>
//           <li>
//             <Link href="/admin/reports" onClick={toggleSidebar}>
//               <FaFileAlt className="sidebar-icon" />
//               Reports
//             </Link>
//           </li>
//           {/* Add more sidebar items as needed */}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

'use client';
import React from 'react';
import './sidebar.css'; // Import the global CSS
import Link from 'next/link';
import { FaBars, FaTachometerAlt, FaGlobe, FaFlag, FaCity, FaTag, FaUsers, FaCog, FaFileAlt, FaCalendarCheck, FaAddressBook, FaPenAlt } from 'react-icons/fa';

const sidebarItems = [
  { href: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { href: '/admin/continents', icon: FaGlobe, label: 'Continents' },
  { href: '/admin/countries', icon: FaFlag, label: 'Countries' },
  { href: '/admin/cities', icon: FaCity, label: 'Cities' },
  { href: '/admin/packages', icon: FaTag, label: 'Packages' },
  { href: '/admin/blog', icon: FaPenAlt, label: 'Blogs' },
  { href: '/admin/contacts', icon: FaAddressBook, label: 'Contacts' },
  { href: '/admin/users', icon: FaUsers, label: 'Users' },
  { href: '/admin/bookings', icon: FaCalendarCheck, label: 'Bookings' },
  { href: '/admin/settings', icon: FaCog, label: 'Settings' },
  { href: '/admin/reports', icon: FaFileAlt, label: 'Reports' },
];

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'shrink'}`}>
      <div className="sidebar-content">
        <ul>
          <li>
            {isOpen ? (
              <button className="close-btn" onClick={toggleSidebar}>
                &times;
              </button>
            ) : (
              <button className="toggle-btn" onClick={toggleSidebar}>
                <FaBars />
              </button>
            )}
          </li>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} onClick={isOpen ? toggleSidebar : undefined}>
                <item.icon className="sidebar-icon" />
                {isOpen && <span>{item.label}</span>}
                {!isOpen && <span className="sidebar_tooltip">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
