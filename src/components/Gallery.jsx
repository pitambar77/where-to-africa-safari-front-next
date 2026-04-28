import React from "react";

const Gallery = ({ images, description }) => (
  <div className="mt-10">
    <h3 className="text-2xl font-semibold mb-2">Gallery</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.name}
          className="rounded-lg shadow hover:scale-105 transition"
        />
      ))}
    </div>
  </div>
);

export default Gallery;
