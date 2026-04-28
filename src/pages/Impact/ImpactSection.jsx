import React from "react";

const ImpactSection = () => {
  return (
    <section className="bg-white py-20 px-6 text-gray-800 text-center">
      {/* Logo + Heading */}
      <div className="max-w-4xl mx-auto">
        {/* Replace with your logo SVG or image */}
        <div className="flex justify-center items-center mb-6">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
            className="w-48 h-48 text-[#3b4b85]"
          >
            <circle cx="70" cy="50" r="25" fill="none" stroke="#f8d447" strokeWidth="4" />
            <circle cx="100" cy="50" r="25" fill="none" stroke="#5ac8aa" strokeWidth="4" />
            <circle cx="85" cy="50" r="25" fill="none" stroke="#7ac2f4" strokeWidth="4" />
          </svg>


        <h1 className="text-5xl font-cormorant text-[#1e2a57] mb-2">impact</h1> */}

          <img src="conservation.png" alt="" className=" w-96" />
        </div>
        {/* <p className="italic text-gray-500 text-lg mb-10">supporting a thriving world</p> */}

        {/* Paragraph */}
        <p className="text-gray-700 leading-relaxed font-quicksand  max-w-[820px]  mx-auto">
          Conservation has long been an active commitment at Where to Africa.
          Earlier initiatives supported community agriculture, women-led
          production, and education projects that strengthened livelihoods
          around key travel regions. Local sourcing programmes helped farmers
          access markets, while collaborative workshops enabled women to produce
          furniture and goods used within tourism operations. Alongside this,
          partnerships addressed human–wildlife conflict, biodiversity
          protection, and social welfare initiatives, proving that tourism can
          contribute directly to community resilience and environmental
          responsibility beyond guest experiences.
        </p>

        {/* Multi-color line */}
        <div className="h-[4px] w-full max-w-5xl mx-auto mt-10 flex">
          <div className="flex-1 bg-[#8b6d4f]" />
          <div className="flex-1 bg-[#ab8c51]" />
          <div className="flex-1 bg-[#f7d386]" />

          <div className="flex-1 bg-[#b9b39a]" />
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 max-w-[820px] mx-auto">
        <p className="text-3xl text-[#ab8c51] uppercase font-cormorant mb-6">
          Our Mission
        </p>
        <p className="italic text-xl text-[#636363]  font-medium font-quicksand leading-relaxed ">
          Our mission is to continue conservation through practical involvement,
          not distant pledges. We focus on community empowerment, ethical
          sourcing, and responsible tourism choices that reduce environmental
          pressure while increasing local benefit. By supporting social
          initiatives, conservation programmes, and green tourism practices,
          travel becomes a tool for long-term progress. Every journey is
          designed to balance enjoyment with accountability, ensuring tourism
          supports people, protects wildlife, and strengthens Africa’s natural
          and social environments responsibly.
        </p>
      </div>
    </section>
  );
};

export default ImpactSection;
