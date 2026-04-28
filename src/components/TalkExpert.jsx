import Image from "next/image";
import "./TalkExpert.css";
import Link from "next/link";

const experts = [
  {
    name: "LION",
    img: "/images/wildlife-lion.webp",
  },
  {
    name: "ELEPHANT",
    img: "/images/wildlife-elephant.webp",
  },
  {
    name: "ZEBRA",
    img: "/images/wildlife-zebra.webp",
  },
];

const TalkExpert = () => {
  return (
    <section className="bg-[#f8f4ec] py-8 sm:py-10 md:py-14 lg:py-20">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-14 items-center">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 text-center md:text-left">
          <p className="uppercase font-quicksand text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3">
            Get Started
          </p>

          <h5 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 md:mb-6 text-[#636363] capitalize font-normal leading-tight">
            Want to chat?
          </h5>

          <p className="text-gray-700 mb-5 md:mb-6 text-sm sm:text-base md:text-lg font-quicksand leading-relaxed max-w-md mx-auto md:mx-0">
            Talk with our team and start planning your African journey
          </p>

          <Link
            href="/enquiry"
            className="inline-block bg-[#b1a47f] hover:bg-[#a0916d] font-quicksand text-white text-xs sm:text-sm uppercase py-2.5 px-5 rounded-sm transition"
          >
            Help Me Plan
          </Link>

          <p className="mt-4 font-quicksand text-xs sm:text-sm text-gray-900 font-medium">
            <span className="font-bold">or call us on:</span> +27(0)315352811
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className=" md:col-span-3 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="group relative w-full sm:w-1/2 md:w-full rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-all duration-500"
            >
              <div className="relative w-full h-[380px] sm:h-[300px] md:h-[360px] overflow-hidden">
                <Image
                  src={expert.img}
                  alt={expert.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500"></div>

              {/* NAME */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-sm sm:text-base md:text-lg font-semibold tracking-[0.2em] uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  {expert.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TalkExpert;
