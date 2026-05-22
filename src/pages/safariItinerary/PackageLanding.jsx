import React from 'react'
import Banner from '../../components/Banner'
import PackageList from '../../components/PackageList'

const PackageLanding = ({ destinationData =[] }) => {

  if (!Array.isArray(destinationData)) {
  return null;
}

  return (
    <div>
           <Banner
      title="Curated Packages "
        subtitle="Explore ready-to-travel safari packages across Africa that combine wildlife viewing, comfortable stays, smooth planning, and meaningful time in nature."
        imageUrl="/images/package-banner.webp"
      />
      <PackageList destinationData= { destinationData }/>
    </div>
  )
}

export default PackageLanding