import React from "react";
import { IoArrowForward } from "react-icons/io5";

const accommodations = [
  {
    id: 1,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/76/08/50/caption.jpg?w=900&h=500&s=1",
    nights: "Nights 1–3",
    title: "Cape Grace, A Fairmont Managed Hotel",
    location: "Cape Town, South Africa",
    tag: "Room Upgrade Available",
  },
  {
    id: 2,
    image: "https://api.avathi.com/images/kabini-river-lodge_1747031197.webp",
    nights: "Nights 4–5",
    title: "Lion Sands Game Reserve",
    location: "Kruger National Park Concession, South Africa",
  },
  {
    id: 3,
    image: "https://salaarc.com/wp-content/uploads/2018/09/Katie-Leaf-what-lodge-1.jpg",
    nights: "Nights 6–7",
    title: "Sabi Sabi Bush Lodge",
    location: "Sabi Sands Private Reserve, South Africa",
     tag: "Room Upgrade Available",
  },
  {
    id: 4,
    image: "https://static.wixstatic.com/media/12a327_43a1c2429e45453dba913eef8fd04fc5~mv2.jpg/v1/fit/w_2500,h_1330,al_c/12a327_43a1c2429e45453dba913eef8fd04fc5~mv2.jpg",
    nights: "Nights 8–9",
    title: "Fairlawns Boutique Hotel & Spa",
    location: "Johannesburg, South Africa",
  },
   {
    id: 5,
    image: "https://assets.milestoneinternet.com/cote-family-companies-parent/grand-view/siteimages/main-property-of-grand-view-lodge-spa-and-golf-resort-minnesota.jpg",
    nights: "Nights 1–3",
    title: "Cape Grace, A Fairmont Managed Hotel",
    location: "Cape Town, South Africa",
    tag: "Room Upgrade Available",
  },
  {
    id: 6,
    image: "https://www.newzealand.com/assets/externally-managed-assets/tbd-assets/tbd-folder-10066185/img-1714023621-2200-3264544-tbd-asset__aWxvdmVrZWxseQo_CropResizeWzk0MCw1MzAsOTAsImpwZyJd.jpg",
    nights: "Nights 4–5",
    title: "Lion Sands Game Reserve",
    location: "Kruger National Park Concession, South Africa",
  },
  {
    id: 7,
    image: "https://www.kellingheath.co.uk/app/uploads/fly-images/6008/3-1821x920.jpg",
    nights: "Nights 6–7",
    title: "Sabi Sabi Bush Lodge",
    location: "Sabi Sands Private Reserve, South Africa",
  },
  {
    id: 8,
    image: "https://www.thinkaec.com/wp-content/uploads/2020/06/Gardiner-Entry-Ext..jpg",
    nights: "Nights 8–9",
    title: "Fairlawns Boutique Hotel & Spa",
    location: "Johannesburg, South Africa",
  },
];

const OvernightAccommodations = () => {
  return (
    <section className="bg-white py-16  font-cormorant ">
      <div className=" px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
        {/* --- Heading --- */}
        <h2 className="text-center text-2xl md:text-3xl font-normal uppercase text-[#a89f82] mb-12">
          Overnight Accommodations
        </h2>

        {/* --- Grid Layout --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 " >
          {accommodations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {item.tag && (
                  <span className="absolute bottom-1 left-1 bg-[#a79353] text-white text-xs font-medium px-3 py-1 rounded-sm uppercase tracking-wide">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* --- Card Text --- */}
              <div className="p-5 space-y-2">
                <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">
                  {item.nights}
                </p>
                <h3 className=" text-xl font-medium text-[#a79353] leading-snug">
                  {item.title}
                </h3>
                <p className=" text-gray-500  font-quicksand  ">{item.location}</p>

<div className=" flex justify-end">
 <button className="flex items-center text-[#a79353]   font-medium mt-3 group">
                  Learn More
                  <IoArrowForward
                    size={16}
                    className="ml-1 transform group-hover:translate-x-1 transition"
                  />
                </button>
</div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OvernightAccommodations;
