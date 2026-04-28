import React from 'react'
import { amenityIcons } from '../data/amenityIcons';

const Icondisplay = () => {

    const renderIcon = (iconName) => {
  const found = amenityIcons.find((i) => i.name === iconName);
  return found ? <found.icon className="text-lg text-gray-600" /> : null;
};

  return (
    <div>{accommodation.amenities.map((am, index) => (
  <div key={index} className="flex items-center gap-2">
    {renderIcon(am.icon)}
    <span>{am.name}</span>
  </div>
))}</div>
  )
}

export default Icondisplay