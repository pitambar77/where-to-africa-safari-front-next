import React from 'react';
import { Plus, Minus } from 'lucide-react'; 

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 font-quicksand">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-lg hover:bg-gray-50  transition-colors"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        <span className="text-gray-800 font-light px-2 ">{item.question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-gray-800 " />
        ) : (
          <Plus className="w-5 h-5 text-gray-800" />
        )}
      </button>
      <div
        id={`accordion-content-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 py-4 ' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-4 text-gray-600 font-quicksand text-base px-2 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default AccordionItem; // Exported for reuse