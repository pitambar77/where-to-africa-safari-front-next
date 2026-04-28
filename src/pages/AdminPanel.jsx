// // import React, { useState } from "react";
// // import ItineraryForm from "../components/ItineraryForm";
// // import ItineraryList from "../components/ItineraryList";

// // const AdminPanel = () => {
// //   const [refresh, setRefresh] = useState(false);
// //   const handleRefresh = () => setRefresh(!refresh);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6 space-y-6">
// //       <h1 className="text-3xl font-bold text-center">🗺️ Itinerary Admin Panel</h1>
// //       <div className="grid md:grid-cols-2 gap-6">
// //         <ItineraryForm refreshList={handleRefresh} />
// //         <ItineraryList refresh={refresh} onRefresh={handleRefresh} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminPanel;


// import React, { useState } from "react";
// import ItineraryForm from "../components/ItineraryForm";
// import ItineraryList from "../components/ItineraryList";

// const AdminPanel = () => {
//   const [refresh, setRefresh] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   const handleRefresh = () => setRefresh(!refresh);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-center">🗺️ Itinerary Admin Panel</h1>
//       <div className="grid md:grid-cols-2 gap-6">
//         <ItineraryForm
//           refreshList={handleRefresh}
//           editItem={editItem}
//           clearEdit={() => setEditItem(null)}
//         />
//         <ItineraryList
//           refresh={refresh}
//           onRefresh={handleRefresh}
//           onEdit={(item) => setEditItem(item)}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useState } from "react";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryList from "../components/ItineraryList";

const AdminPanel = () => {
  const [refresh, setRefresh] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🗺️ Itinerary Admin Panel</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ItineraryForm
          refreshList={handleRefresh}
          editItem={editItem}
          clearEdit={() => setEditItem(null)}
        />
        <ItineraryList
          refresh={refresh}
          onRefresh={handleRefresh}
          onEdit={(item) => setEditItem(item)}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
