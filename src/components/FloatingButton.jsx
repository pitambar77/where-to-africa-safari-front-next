

import { FaEnvelope } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center cursor-pointer gap-2 bg-[#aba186] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#ab8c51] transition-all duration-300"
    >
      <FaEnvelope className="text-lg" />
      Enquiry
    </button>
  );
};

export default FloatingButton;
