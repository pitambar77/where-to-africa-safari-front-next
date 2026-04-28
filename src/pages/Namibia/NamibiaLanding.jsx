import React from 'react'
import Banner from '../../components/Banner'
import Overview from '../../components/Overview'
import DestinationGrid from '../../components/DestinationGrid'
import SafariCard from '../../components/SafariCard';
import PackageCardGridSection from '../../components/PackageCardGridSection'
import TravelguideSection from '../../components/TravelguideSection';


const areas = [
  {
    name: "Sossusvlei",
    path: "/cape-town",
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
    alt: "A view of Cape Town city",
  },
  {
    name: "Nambia Desert",
    path: "/greater-kruger",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
    alt: "A leopard resting in the grass",
  },
  {
    name: "Etosha Nation Park",
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
    country: "Namibia",
    title: "7-Day Desert, Dune & Wildlife fry-in safari",
    nights: 5,
    price: 10700,
    image:
      "https://worldadventuretours.com/wp-content/uploads/2023/09/product-namibia-dunes.jpg",
  },
  {
    id: 2,
    country: "Nambia",
    title: "7-Day Nambia Dune  fry-in safari",
    nights: 11,
    price: 9300,
    image:
      "https://cdn.prod.website-files.com/607e99bffc9a6042b332722c/63ca5c2c9ceba842b75c2969_Namibia-Flying-Safari_1.webp",
  },
  {
    id: 3,
    country: "Nambia",
    title: "11-Day Nambia  Wildlife fry-in safari",
    nights: 9,
    price: 13500,
    image:
      "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1624297818708-AU950UATMPVI7SUZ7N2O/DESERT-WHISPER-LAYOUT.jpg",
  },
  {
    id: 4,
    country: "Dune & Wildlife",
    title: "7-Day Desert, Dune & Wildlife fry-in safari",
    nights: 9,
    price: 13500,
    image:
      "https://cdn.jacadatravel.com/wp-content/uploads/bis-images/200813/sossusvlei_trees_namibia-2400x1400-f50_50.jpg",
  },
  
];

const journeys = [
  {
    image: "https://i.cdn.newsbytesapp.com/images/l89420230927165827.jpeg",
    title: "On Safari with Where to Africa",
    description:
      "Experience the wonder of all-inclusive access, expert Tauck Directors, and thoughtfully selected accommodations, for the most authentic safaris.",
    link: "/travel-guide",
  },
  {
    image: "https://khwaiexpeditionscamp.com/wp-content/uploads/2024/06/The-African-Elephant.jpg",
    title: "When's the Best Time to Safari",
    description:
      "Every season brings something special, so there's truly no 'best' time – just the time that's right for you.",
    link: "/travel-guide",
  },
  {
    image:
      "https://res.cloudinary.com/enchanting/q_70,f_auto,c_fill,g_face/hj-web/2020/12/Predator%C2%B4s-love.-Lioness-and-cub-in-the-Kruger-NP-South-Africa-min.jpg",
    title: "How to Choose Your Safari",
    description:
      "Each safari has its own distinct highlights – explore all of your options to find the journey that excites you the most!",
    link: "/travel-guide",
  },
  {
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/WILDwatch-Africa-Tanzania-Bateleur-Ben-Haas-lion-playtime-08-Website-1920x1080-fill-gravityauto-Q_AutoBest.jpg",
    title: "Your Essential Safari Packing Guide",
    description:
      "Tips, tricks and must-haves for packing on your upcoming safari adventure.",
    link: "/travel-guide",
  },
];

const NamibiaLanding = () => {
  return (
    <div>
        <Banner
        title="Explore our Namibia "
        subtitle="World Elephant Day 2025 unites experts and citizens to safeguard matriarchs, memories, and habitat. "
        imageUrl="https://www.magicalgorillaadventures.com/wp-content/uploads/2023/02/18-Day-Namibia-Botswana-Victoria-Falls-Epic-Safari.jpg"
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
    <TravelguideSection
      heading="Journey Collection"
      subheading="On Safari with Where to Africa"
      journeys={journeys}
    />
    </div>
  )
}

export default NamibiaLanding