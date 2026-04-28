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
    name: "Livingstone & Mosi on Tunya park",
    path: "/cape-town",
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
    alt: "A view of Cape Town city",
  },
  {
    name: "Lower Zambezi National Park",
    path: "/greater-kruger",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
    alt: "A leopard resting in the grass",
  },

  // ...other areas
];

const safarisData = [
  {
    id: 1,
    country: "Livingstone",
    title: "2 Night Royal Livingstone Hotel",
    nights: 5,
    price: 10700,
    image:
      "https://assets.anantara.com/image/upload/q_auto,f_auto/media/minor/anantara/images/royal-livingstone-by-anantara/the-resort/desktop-banner/royal_livingstone_by_anantara_header_1920x1080.jpg",
  },
  {
    id: 2,
    country: "Kenya & Seychelles",
    title: "Livingstone Expolore",
    nights: 11,
    price: 9300,
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/08001640/royal-livingstone-hotel-1-2.jpg",
  },
  {
    id: 3,
    country: "Botswana & Zimbabwe",
    title: "Classic Livingstone",
    nights: 9,
    price: 13500,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/33/db/58/chapa-classic-lodge.jpg?w=900&h=500&s=1",
  },
  {
    id: 4,
    country: "India",
    title: "In Search of Snow Leopards",
    nights: 11,
    price: 10900,
    image:
      "https://vanawaytour.com/wp-content/uploads/2022/07/130719568_3880589905307735_5017876080163182741_n-e1697728077810.jpg",
  },
  {
    id: 5,
    country: "Kenya",
    title: "Samburu and Maasai Mara Safari",
    nights: 7,
    price: 10900,
    image:
      "https://media1.thrillophilia.com/filestore/ugzgu6758b9z89oh46cq2b0q9txg_1608633488_shutterstock_538363867.jpg?w=400&dpr=2",
  },
  {
    id: 6,
    country: "Rwanda",
    title: "Authentic Rwanda Gorilla Trekking Holiday",
    nights: 8,
    price: 18900,
    image:
      "https://www.africa-adventure.com/wp-content/uploads/2019/06/76-credit-Tim-Kuhn-high-res.jpg",
  },
];

const guestFavorites = [
  { image: "https://www.riversandoceans.com/wp-content/uploads/2023/02/Africa-Whitewater-Rafting-e1678682858486.jpg", title: "white water rafting" },
  { image: "https://www.visitvictoriafalls.org/wp-content/uploads/2024/07/Mukuni-Village-Tour-2.jpg", title: "cultural village tour" },
  { image: "https://whereto.africa/wp-content/uploads/2016/06/Royal-Livingstone-Steam-Train.jpg", title: "steam train dinner safari" },
  { image: "https://www.sierraclub.org/sites/default/files/styles/sierra_full_page_width/public/sierra/articles/big/SIERRA-iStock-687031310-WB.jpg.webp?itok=yfxjyXCZ", title: "Morocco: Imperial Cities & Sahara" },
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

const ZambiaLanding = () => {
  return (
    <div>
        <Banner
         title="Explore our Zambia "
        subtitle="World Elephant Day 2025 unites experts and citizens to safeguard matriarchs, memories, and habitat. "
        imageUrl="https://yellowzebrasafaris.com/media/20047/shutterstock_119016328.jpg?rxy=0.5166666666666667%2C0.3725&width=2048&height=1024&format=jpg&v=1da5e146feb4f20"
        />
         <div className=" bg-[#faf5e9]">
        <Overview
          title={"Welcome To Zambia"}
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
      subtitle="Zambia Trips to Inspire"
      data={safarisData}
      CardComponent={SafariCard}
      emptyMessage="No safaris found."
    />

    <ExperienceCarousel
      title="Guest Favorites in Zambia"
      description="An unforgettable journey through Botswana’s wilderness, filled with breathtaking views and timeless memories."
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

export default ZambiaLanding