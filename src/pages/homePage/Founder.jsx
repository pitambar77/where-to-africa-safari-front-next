import Image from "next/image";

const Founder = () => {
  return (
    <>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Subtitle */}
            <p className="font-quicksand text-[#a89f82] uppercase text-xs sm:text-base tracking-wide">
              John McMillan, CEO at Where to Africa:
            </p>

            {/* Heading */}
            <h5 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-3 mb-4 md:mb-6 text-[#636363] capitalize font-normal leading-tight">
              "Travel That Respects Africa’s Future"
            </h5>

            {/* Paragraphs */}
            <p className="font-quicksand mb-4 text-sm sm:text-base text-gray-700">
              Spending time across Africa revealed how tourism decisions affect
              people and nature. Responsible travel begins with listening to
              local voices and understanding natural limits.
            </p>

            <p className="font-quicksand mb-4 text-sm sm:text-base text-gray-700">
              “Where to Africa” was created around the belief that travel should
              benefit the places it touches. Supporting local communities,
              protecting wildlife, and respecting cultural heritage remain
              central to every journey offered.
            </p>

            <p className="font-quicksand text-sm sm:text-base text-gray-700">
              Journeys designed by “Where to Africa” are built on trust and
              long-term partnerships across Southern and East Africa. Each trip
              considers the land, the people, and what remains after visitors
              leave. The goal is simple: ensure travelers return home more
              aware, while destinations gain lasting value through protection,
              partnership, and respect. This approach guides decisions daily and
              reflects a commitment to Africa’s future, its communities, and its
              wildlife for generations to come.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-md overflow-hidden">
            <Image
              src="/images/fonder.webp"
              alt="John McMillan, CEO of Where to Africa"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* <div className=" px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16 "> */}
    </>
  );
};
export default Founder;
