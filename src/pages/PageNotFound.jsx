import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-[#fbf6ea] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="font-cormorant text-[120px] text-[#aaa086] leading-none">
        404
      </h1>

      <h2 className="font-cormorant text-4xl text-[#686868] mt-4">
        Lost in the Wild?
      </h2>

      <p className="font-quicksand text-[#686868] max-w-xl mt-4">
        The page you are looking for seems to have wandered off the safari trail.
        Let’s guide you back to a beautiful journey.
      </p>

      <Link
        href="/"
        className="mt-8 bg-[#aaa086] text-white px-8 py-3 uppercase tracking-wider text-sm font-quicksand hover:bg-[#8f846d] transition duration-300 rounded-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;