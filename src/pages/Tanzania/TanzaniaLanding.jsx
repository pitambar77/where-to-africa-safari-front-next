import React from 'react'
import Banner from '../../components/Banner';
import Overview from '../../components/Overview';
import DestinationGrid from '../../components/DestinationGrid';
import PackageCardGridSection from "../../components/PackageCardGridSection";
import SafariCard from '../../components/SafariCard';
import AccommodationGrid from '../../components/AccommodationGrid';
import TravelguideSection from '../../components/TravelguideSection';


const areas = [
  {
    name: "Serengeti National Park",
    path: "/cape-town",
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
    alt: "A view of Cape Town city",
  },
  {
    name: "Ngorogoro Creater",
    path: "/greater-kruger",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
    alt: "A leopard resting in the grass",
  },
  {
    name: "Zanzibar",
    path: "/winelands",
    image:
      "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1638810289461-RQXPK2PDW8QI2CKZ1OJ7/Cape+Winelands+South+Africa",
    alt: "Vineyards with mountains in the background",
  },
  // ...other areas
];


const safarisData = [
  {
    id: 1,
    country: "Tanzania",
    title: "Northern Quest",
    nights: 5,
    price: 10700,
    image:
      "https://media.krem.com/assets/KREM/images/a53bb1a7-f7ee-44f3-bf4f-0be105b605ed/a53bb1a7-f7ee-44f3-bf4f-0be105b605ed_1140x641.jpg",
  },
  {
    id: 2,
    country: "Tanzania",
    title: "Mara Savannah To Seashore",
    nights: 11,
    price: 9300,
    image:
      "https://www.ugandasafaristours.com/wp-content/uploads/2019/09/Day-4_Serengeti-National-Park.jpg",
  },
  {
    id: 3,
    country: "Tanzania",
    title: "Kill Conquest",
    nights: 9,
    price: 13500,
    image:
      "https://www.bwindiforestnationalpark.com/wp-content/uploads/botswana-buffalo.jpg",
  },
  {
    id: 4,
    country: "Tanzania",
    title: "Serengeti savannah to seashore",
    nights: 11,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/8ud8uc29s3xpakhnv1okau8usdgn_53318451400_55f7967356_5k.jpg",
  },
  {
    id: 5,
    country: "Tanzania",
    title: "Tanzania under canvas",
    nights: 7,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/ugzgu6758b9z89oh46cq2b0q9txg_1608633488_shutterstock_538363867.jpg?w=400&dpr=2",
  },
  {
    id: 6,
    country: "Tanzania",
    title: "Zanzibar Zenith",
    nights: 8,
    price: 18900,
    image:
      "https://wetu.com/imageHandler/c1920x1080/13944/zanzibar-istock-1301087425.jpg?fmt=jpg",
  },
];


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

const journeys = [
  {
    image: "https://i.cdn.newsbytesapp.com/images/l89420230927165827.jpeg",
    title: "On Safari with Where to Africa",
    description:
      "Experience the wonder of all-inclusive access, expert Tauck Directors, and thoughtfully selected accommodations, for the most authentic safaris.",
    link: "/safari-experience",
  },
  {
    image: "https://khwaiexpeditionscamp.com/wp-content/uploads/2024/06/The-African-Elephant.jpg",
    title: "When's the Best Time to Safari",
    description:
      "Every season brings something special, so there's truly no 'best' time – just the time that's right for you.",
    link: "/best-time",
  },
  {
    image:
      "https://res.cloudinary.com/enchanting/q_70,f_auto,c_fill,g_face/hj-web/2020/12/Predator%C2%B4s-love.-Lioness-and-cub-in-the-Kruger-NP-South-Africa-min.jpg",
    title: "How to Choose Your Safari",
    description:
      "Each safari has its own distinct highlights – explore all of your options to find the journey that excites you the most!",
    link: "/choose-your-safari",
  },
  {
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/WILDwatch-Africa-Tanzania-Bateleur-Ben-Haas-lion-playtime-08-Website-1920x1080-fill-gravityauto-Q_AutoBest.jpg",
    title: "Your Essential Safari Packing Guide",
    description:
      "Tips, tricks and must-haves for packing on your upcoming safari adventure.",
    link: "/packing-guide",
  },
];

const TanzaniaLanding = () => {
  return (
    <div>
              <Banner
        title="Explore our Tanzania "
        subtitle="World Elephant Day 2025 unites experts and citizens to safeguard matriarchs, memories, and habitat. "
        imageUrl="https://www.andbeyond.com/wp-content/uploads/sites/5/Hot-Air-Balloon-in-Tarangire-National-park.jpg"
      />
      <div className=" bg-[#faf5e9]">
        <Overview
          title={"Welcome To Botswana"}
          subtitle={
            "African landscapes parading with the circle of life promise magical moments unlike any you have imagined before. You'll find them..."
          }
          description={
            "... while tasting wines carefully cultivated and expertly poured. At safari lodges, tented camps and members' clubs luxuriously appoint..."
          }
        />
        <DestinationGrid
          data={areas}
          title=""
          buttonText="More South Africa Areas"
          onButtonClick={() => console.log("Load more South Africa areas")}
        />
        
      </div>

      <PackageCardGridSection
      title="Your Journeys"
      subtitle="Botswana Trips to Inspire"
      data={safarisData}
      CardComponent={SafariCard}
      emptyMessage="No safaris found."
    />

    <AccommodationGrid
      title="Overnight Accommodations"
      data={accommodations}
      onCardClick={''}
    />
    <TravelguideSection
      heading="Journey Collection"
      subheading="On Safari with Where to Africa"
      journeys={journeys}
    />
    </div>
  )
}

export default TanzaniaLanding