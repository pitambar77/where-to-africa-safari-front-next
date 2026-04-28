// import React, { useEffect, useState } from "react";
// import { getAccommodations, getFilteredAccommodations } from "../../api/accommodationAPI";
// import FilterBar from "../../components/FilterBar";
// import AccommodationCard from "../../components/AccommodationCard";

// const AccommodationLanding = () => {
//   const [accommodations, setAccommodations] = useState([]);
//   const [banner, setBanner] = useState({});
//   const [overview, setOverview] = useState({});
//   const [filters, setFilters] = useState({ destination: "", subdestination: "" });

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     const { data } = await getAccommodations();
//     setAccommodations(data);

//     if (data.length > 0) {
//       const first = data[0];
//     //   setBanner({
//     //     image: first.bannerImages?.[0]?.url,
//     //     title: first.bannerTitle,
//     //     description: first.bannerDescription,
//     //   });
//     setBanner({
//   image: first.bannerImages?.[0]?.url || first.bannerImages?.[0],
//   title: first.bannerTitle,
//   description: first.bannerDescription,
// });

//       setOverview({
//         title: first.overviewTitle,
//         subtitle: first.overviewSubtitle,
//         description: first.overviewDescription,
//       });
//     }
//   };

//   const handleFilter = async () => {
//     if (!filters.destination && !filters.subdestination) {
//       fetchAll();
//     } else {
//       const { data } = await getFilteredAccommodations(
//         filters.destination,
//         filters.subdestination
//       );
//       setAccommodations(data);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FBF8F3]">
//       {/* Banner */}
//       <div
//         className="h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
//         style={{ backgroundImage: `url(${banner.image})` }}
//       >
//         <div className="bg-black/40 p-6 rounded">
//           <h1 className="text-4xl font-bold mb-2">{banner.title}</h1>
//           <p className="max-w-3xl mx-auto">{banner.description}</p>
//         </div>
//       </div>

//       {/* Overview */}
//       <div className="py-10 text-center max-w-3xl mx-auto">
//         <h2 className="text-3xl font-semibold mb-2">{overview.title}</h2>
//         <h3 className="text-lg text-gray-500 mb-4">{overview.subtitle}</h3>
//         <p className="text-gray-700">{overview.description}</p>
//       </div>

//       {/* Filters */}
//       <FilterBar filters={filters} setFilters={setFilters} onFilter={handleFilter} />

//       {/* Accommodation Cards */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
//         {accommodations.map((item) => (
//           <AccommodationCard key={item._id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AccommodationLanding;


// update the destion filter


import React, { useEffect, useState } from "react";
import {
  getAccommodations,
  getFilteredAccommodations,
} from "../../api/accommodationAPI.js";
import FilterBar from "../../components/FilterBar";
import AccommodationCard from "../../components/AccommodationCard";

// ✅ Destination constants (same as backend)
const DESTINATIONS = ["Africa", "Asia", "Europe", "South America", "North America"];
const SUBDESTINATIONS = {
  Africa: ["Kenya", "Tanzania", "South Africa", "Namibia"],
  Asia: ["Japan", "Thailand", "Vietnam", "India"],
  Europe: ["France", "Italy", "Spain", "Greece"],
  "South America": ["Peru", "Brazil", "Chile"],
  "North America": ["USA", "Canada", "Mexico"],
};

const AccommodationLanding = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [banner, setBanner] = useState({});
  const [overview, setOverview] = useState({});
  const [filters, setFilters] = useState({ destination: "", subdestination: "" });

  // ✅ Fetch all on first load
  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ Get all accommodations
  const fetchAll = async () => {
    try {
      const { data } = await getAccommodations();
      setAccommodations(data);

      // Set default banner and overview
      if (data.length > 0) {
        const first = data[0];
        setBanner({
          image: first.bannerImages?.[0]?.url || first.bannerImages?.[0],
          title: first.bannerTitle,
          description: first.bannerDescription,
        });
        setOverview({
          title: first.overviewTitle,
          subtitle: first.overviewSubtitle,
          description: first.overviewDescription,
        });
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  };

  // ✅ Filter handler
  const handleFilter = async () => {
    try {
      if (!filters.destination && !filters.subdestination) {
        fetchAll();
      } else {
        const { data } = await getFilteredAccommodations(
          filters.destination,
          filters.subdestination
        );
        setAccommodations(data);

        // Optional: auto-update banner + overview based on filtered data
        if (data.length > 0) {
          const first = data[0];
          setBanner({
            image: first.bannerImages?.[0]?.url || first.bannerImages?.[0],
            title: first.bannerTitle,
            description: first.bannerDescription,
          });
          setOverview({
            title: first.overviewTitle,
            subtitle: first.overviewSubtitle,
            description: first.overviewDescription,
          });
        } else {
          setBanner({});
          setOverview({});
        }
      }
    } catch (error) {
      console.error("Error filtering accommodations:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* ✅ Banner Section */}
      {banner.image && (
        <div
          className="h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="bg-black/40 p-6 rounded">
            <h1 className="text-4xl font-bold mb-2">{banner.title}</h1>
            <p className="max-w-3xl mx-auto">{banner.description}</p>
          </div>
        </div>
      )}

      {/* ✅ Overview Section */}
      {(overview.title || overview.description) && (
        <div className="py-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2">{overview.title}</h2>
          <h3 className="text-lg text-gray-500 mb-4">{overview.subtitle}</h3>
          <p className="text-gray-700">{overview.description}</p>
        </div>
      )}

      {/* ✅ Dynamic Filter Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onFilter={handleFilter}
        destinations={DESTINATIONS}
        subdestinations={SUBDESTINATIONS}
      />

      {/* ✅ Accommodation Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
        {accommodations.length > 0 ? (
          accommodations.map((item) => (
            <AccommodationCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No accommodations found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccommodationLanding;
