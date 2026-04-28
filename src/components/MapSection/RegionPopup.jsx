import { Link } from "react-router-dom";

const RegionPopup = ({ region, onClose }) => {
  return (
    <div className="w-[300px] bg-white shadow-2xl relative font-serif rounded overflow-hidden">
      
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/70"
      >
        ✕
      </button>

      {/* IMAGE */}
      <div className="relative h-[200px]">
        <img
          src={region.image}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* TITLE */}
        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-2xl">{region.name}</h2>
        </div>

        {/* TOURS */}
        <div className="absolute bottom-5 right-5 text-white text-right">
          <div className="text-2xl">{region.tours}</div>
          <div className="text-xs tracking-widest">TOURS</div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to={`/region/${region.name}`}
        className="block text-center py-4 text-green-600 font-semibold hover:underline"
      >
        See All {region.name} Tours →
      </Link>

      {/* POINTER */}
      <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white mx-auto" />
    </div>
  );
};