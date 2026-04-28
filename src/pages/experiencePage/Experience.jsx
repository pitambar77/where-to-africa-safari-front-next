import React from 'react'
import Banner from '../../components/Banner'
import Overview from '../../components/Overview'
import SouthAfricaAreas from './SouthAfricaAreas'
import Itinarary from './Itinarary'
import ExperienceCarousel from './ExperienceCarousel'
import OvernightAccommodations from './OvernightAccommodations'
import JourneyCollection from './JourneyCollection'


const Experience = () => {
  return (
    <>
<Banner
imageUrl={"https://safari-tours-africa.b-cdn.net/wp-content/uploads/panorama-route-south-africa-scaled.webp"}
title={"Explore South Africa"}
subtitle={"Luxury Africa safari holidays tailor-made for you by travel specialists with years of first-hand knowledge of Africa"}
/>
<div className=' bg-[#faf5e9]'>
<Overview
title={"Welcome To Africa"}
subtitle={"African landscapes parading with the circle of life promise magical moments unlike any you have imagined before. You'll find them..."}
description={"... while tasting wines carefully cultivated and expertly poured. At safari lodges, tented camps and members' clubs luxuriously appoint..."}
/>
</div>

<SouthAfricaAreas/>
<Itinarary/>
<ExperienceCarousel/>
<OvernightAccommodations/>
<JourneyCollection/>
    </>
  )
}

export default Experience