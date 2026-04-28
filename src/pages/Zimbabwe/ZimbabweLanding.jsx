import React from 'react'
import Banner from '../../components/Banner'
import Overview from '../../components/Overview'
import DestinationGrid from '../../components/DestinationGrid'
import PackageCardGridSection from "../../components/PackageCardGridSection";
import SafariCard from '../../components/SafariCard';
import ExperienceCarousel from '../../components/ExperienceCarousel';
import AccommodationGrid from '../../components/AccommodationGrid';
import TravelguideSection from '../../components/TravelguideSection';

const areas = [
  {
    name: "Victoria falls",
    path: "/cape-town",
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
    alt: "A view of Cape Town city",
  },
  {
    name: "Hwange Game Reserve",
    path: "/greater-kruger",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
    alt: "A leopard resting in the grass",
  },
  {
    name: "Lake Kariba",
    path: "/winelands",
    image:
      "https://www.wildernessdestinations.com/media/5donokzk/wilderness-zimbabwe-hero.jpg?rmode=crop&height=809",
    alt: "Vineyards with mountains in the background",
  },
    {
    name: "Mana Pools",
    path: "/winelands",
    image:
      "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1638810289461-RQXPK2PDW8QI2CKZ1OJ7/Cape+Winelands+South+Africa",
    alt: "Vineyards with mountains in the background",
  },
    {
    name: "Eastern Highlands",
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
    country: "Victorial Falls",
    title: "2 Nights Victoria Falls Hotel Package",
    nights: 2,
    price: 10700,
    image:
      "https://www.joasafaris.com/website_images/botswana/Hero%20Image_Botswana.webp",
  },
  {
    id: 2,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 11,
    price: 9300,
    image:
      "https://www.redsavannah.com/-/media/countries/botswana/botswana-hippo-chobe-national-park-shtstck.jpg?h=700&w=1400&udi=1&cropregion=0,228,2800,1628&hash=9D007E7D3C6345750E243FA6D067CB72",
  },
  {
    id: 3,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 9,
    price: 13500,
    image:
      "https://www.bwindiforestnationalpark.com/wp-content/uploads/botswana-buffalo.jpg",
  },
  {
    id: 4,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 11,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/8ud8uc29s3xpakhnv1okau8usdgn_53318451400_55f7967356_5k.jpg",
  },
  {
    id: 5,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 7,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/ugzgu6758b9z89oh46cq2b0q9txg_1608633488_shutterstock_538363867.jpg?w=400&dpr=2",
  },
  {
    id: 6,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 8,
    price: 18900,
    image:
      "https://www.africa-adventure.com/wp-content/uploads/2019/06/76-credit-Tim-Kuhn-high-res.jpg",
  },
  {
    id: 7,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 11,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/8ud8uc29s3xpakhnv1okau8usdgn_53318451400_55f7967356_5k.jpg",
  },
  {
    id: 8,
    country: "Victoria Falls",
    title: "2 Nights Victoria Falls Hotel Packag",
    nights: 7,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/ugzgu6758b9z89oh46cq2b0q9txg_1608633488_shutterstock_538363867.jpg?w=400&dpr=2",
  },
];

const guestFavorites = [
  { image: "https://www.matriarchafrica.com/wp-content/uploads/2018/07/Zambezi-Dinner-Cruises.jpg", title: "Zimbezi Dinner Cruise" },
  { image: "https://artofsafari.travel/wp-content/uploads/2017/03/Zimbabwe_VictoriaFalls_andBeyond_Matetsi-RiverLodge_BoatCruise2.jpg", title: "Signeture sunset cruise" },
  { image: "https://www.chiawa.com/wp-content/uploads/2020/02/LZ-GameDrivesSlider7.jpg", title: "zimbezi park game drive" },
  { image: "https://im8hoursahead.com/wp-content/uploads/2018/10/chobedaytrip_7006-1.jpg", title: "chobe day trip" },
];

const accommodations = [
  {
    id: 1,
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/Main-Guest-Area-At-Victoria-Falls-Hotel.jpg",
    nights: "Nights 1–3",
    title: "Victoria Falls Hotels",
    location: "Upmarket Hotels and Lodges",
    tag: "Room Upgrade Available",
  },
  {
    id: 2,
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/Old-Drift-Lodge-guest-views.jpg",
    nights: "Nights 4–5",
    title: "Old Drift Lodge",
    location: "Upmarket Hotels and Lodges",
  },
  {
    id: 3,
    image: "https://safari-consultants.com/wp-content/uploads/2023/09/Kavinga-Safari-Camp-hide-c_ksc.jpg",
    nights: "Nights 6–7",
    title: "Robins Camp",
    location: "Hwange Game Reserve",
     tag: "Room Upgrade Available",
  },
  {
    id: 4,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175312009.jpg?k=80adca73a2822a8151ea0f7acc53093e62bf5ff8b284cb9f424236164c2ac211&o=&hp=1",
    nights: "Nights 8–9",
    title: "Ivory Lodge",
    location: "JHwange Game Reserve",
  },
   {
    id: 5,
    image: "https://www.discoverafrica.com/wp-content/uploads/wetu/25926/ivory_oct_2019_24-1920x1080.jpg",
    nights: "Nights 1–3",
    title: "Batonka Lodge",
    location: "Midmarket ",
    tag: "Room Upgrade Available",
  },
  {
    id: 6,
    image: "https://www.newzealand.com/assets/externally-managed-assets/tbd-assets/tbd-folder-10066185/img-1714023621-2200-3264544-tbd-asset__aWxvdmVrZWxseQo_CropResizeWzk0MCw1MzAsOTAsImpwZyJd.jpg",
    nights: "Nights 4–5",
    title: "Nkosi Lodge",
    location: "Midmarket",
  },
  {
    id: 7,
    image: "https://www.thebayetecollection.com/wp-content/uploads/2024/05/A744795-HDR@INkosi-scaled.jpeg",
    nights: "Nights 6–7",
    title: "Nyamatusi Camp",
    location: "Mana Pools",
  },
  {
    id: 8,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/13/7e/ed/caption.jpg?w=1200&h=-1&s=1",
    nights: "Nights 8–9",
    title: "Kavinga Safa",
    location: "Mana Pools",
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

const ZimbabweLanding = () => {
  return (
    <div>
      <Banner
       title="Explore our Zimbabwe "
        subtitle="World Elephant Day 2025 unites experts and citizens to safeguard matriarchs, memories, and habitat. "
        imageUrl="https://imgproxy.natucate.com/j3v070BhlCRfx3iynDyJvvc4OPeswHuLFoLAfKhZcGo/rs:fill/g:ce/w:3840/h:2160/aHR0cHM6Ly93d3cubmF0dWNhdGUuY29tL21lZGlhL3BhZ2VzL3JlaXNlemllbGUvYTA0MWZiNTEtMjY0Mi00N2Y2LTk0ZjctZGFhMjk5YmZkNWEyL2NlM2QwYzFkYzEtMTY3OTQ4Njg2My9zaW1iYWJ3ZS1sYWVuZGVyaW5mb3JtYXRpb25lbi1hZnJpa2EtbmF0dXJrdXJzLWd1aWRlYXVzYmlsZHVuZy1sYW5kc2NoYWZ0LXNhYmJhdGphaHItbmF0dWNhdGUuanBn"
      
      />
      <div className=" bg-[#faf5e9]">
        <Overview
          title={"Welcome To Zimbabwe"}
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
      subtitle="Zimbabwe Trips to Inspire"
      data={safarisData}
      CardComponent={SafariCard}
      emptyMessage="No safaris found."
    />
    <ExperienceCarousel
      title="Guest Favorites in Zimbabwe"
      description="An unforgettable journey through Zimbabwe wilderness, filled with breathtaking views and timeless memories."
      author="John D."
      data={guestFavorites}
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

export default ZimbabweLanding