"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Botswana",
    image: "/botswana-destination.webp",
    path: "/botswana",
  },
  {
    name: "Kenya",
    image: "/kenya-destination-banner.webp",
    path: "/kenya",
  },
  {
    name: "Mozambique",
    image: "/mozambique-destination.webp",
    path: "/mozambique",
  },
  {
    name: "Namibia",
    image: "/namibia-destination-banner.webp",
    path: "/namibia",
  },
  {
    name: "South Africa",
    image: "/south-africa-destination.webp",
    path: "/south-africa",
  },
  {
    name: "Tanzania",
    image: "/tanzania-destination.webp",
    path: "/tanzania",
  },
  {
    name: "Zambia",
    image: "/zambia-destination.webp",
    path: "/zambia",
  },
  {
    name: "Zimbabwe",
    image: "/zimbabwe-destination.webp",
    path: "/zimbabwe",
  },
];

export default function DestinationHero({ speed = 15, resumeDelay = 3000 }) {
  const router = useRouter();
  const listRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const [itemHeight, setItemHeight] = useState(48);
  const [totalHeight, setTotalHeight] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState(destinations[0].name);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  // Measure item height
  useEffect(() => {
    const measure = () => {
      const first = listRef.current?.querySelector("[data-item]");
      if (first) {
        const h = first.getBoundingClientRect().height;
        setItemHeight(h || 48);
        setTotalHeight(destinations.length * (h || 48));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    lastTimeRef.current = null;

    const step = (ts) => {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      if (!isPaused) {
        setOffset((prev) => {
          const next = prev + speed * dt;
          const wrapped = next >= totalHeight ? next - totalHeight : next;

          // Calculate center offset (half of visible container height)
          const visibleHeight = 320; // your "h-80" = 20rem = 320px
          const centerOffset = wrapped + visibleHeight / 2;

          // Find which item is currently aligned with the input (center)
          const currentIndex =
            Math.floor(centerOffset / itemHeight) % destinations.length;

          // Update only if it changed (avoid flicker)
          setActiveIndex((prevIndex) => {
            if (prevIndex !== currentIndex) {
              setInputValue(destinations[currentIndex].name);
              return currentIndex;
            }
            return prevIndex;
          });

          return wrapped;
        });
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, speed, totalHeight, itemHeight]);

  // Input typing & autocomplete
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    clearTimeout(resumeTimeoutRef.current);
    setIsPaused(true);

    if (value.trim() === "") {
      setSuggestions([]);
      resumeTimeoutRef.current = setTimeout(
        () => setIsPaused(false),
        resumeDelay,
      );
      return;
    }

    const filtered = destinations.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(filtered);
    setHighlightIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected =
        highlightIndex >= 0
          ? suggestions[highlightIndex]
          : destinations.find(
              (d) => d.name.toLowerCase() === inputValue.trim().toLowerCase(),
            );
      if (selected) {
        navigate(selected.path);
        setInputValue("");
        setSuggestions([]);
        setIsPaused(false);
      }
    }
  };

  const handleSuggestionClick = (name) => {
    const match = destinations.find(
      (d) => d.name.toLowerCase() === name.toLowerCase(),
    );
    if (match) {
      router.push(match.path);
      setInputValue("");
      setSuggestions([]);
      setIsPaused(false);
    }
  };

  // const handleGo = () => {
  //   // Pause and reset input on Go button click
  //   setIsPaused(true);
  //   setInputValue("");

  //   const match = destinations.find(
  //     (d) => d.name.toLowerCase() === inputValue.trim().toLowerCase(),
  //   );

  //   if (match) {
  //     router.push(match.path);
  //   } else {
  //     alert("Destination not found");
  //   }

  //   // Resume after short delay
  //   setTimeout(() => {
  //     setIsPaused(false);
  //   }, 1000);
  // };

  const handleGo = () => {
    setIsPaused(true);

    const match = destinations.find(
      (d) => d.name.toLowerCase() === inputValue.trim().toLowerCase(),
    );

    if (match) {
      router.push(match.path);
    } else {
      alert("Destination not found");
    }

    setInputValue("");
    setSuggestions([]);

    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  const handleCityClick = (i) => {
    const city = destinations[i];
    router.push(city.path);
    setInputValue("");
    setSuggestions([]);
    setIsPaused(false);
  };

  const handleInputFocus = () => {
    // Pause scrolling when user clicks or focuses the input
    setIsPaused(true);
    setInputValue("");
  };

  const handleInputBlur = () => {
    // Resume scrolling when user leaves input after short delay
    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  const active = destinations[activeIndex % destinations.length];
  const translateY = -offset;
  const bgImage = active.image;

  const selectedDestination =
    destinations.find(
      (d) => d.name.toLowerCase() === inputValue.trim().toLowerCase(),
    ) || active;

  return (
    <section className="relative h-[70vh] md:h-[650px] lg:h-[80vh] 2xl:h-[90vh] w-full overflow-hidden">
      {/* Background */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      /> */}

      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={active.name}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      {/* Container */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 h-full">
        <div className="relative z-10 flex h-full items-center">
          <div className="w-full text-white">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-cormorant font-semibold mb-8 md:mb-12 leading-tight">
              Where Will Africa Take You?
            </h1>

            {/* Scroll Section */}
            <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
              {/* List */}
              <div
                className="absolute top-0 left-0"
                style={{
                  transform: `translateY(${translateY}px)`,
                  willChange: "transform",
                }}
              >
                <div ref={listRef}>
                  {[...destinations, ...destinations].map((place, idx) => {
                    const isActive =
                      idx % destinations.length ===
                      activeIndex % destinations.length;

                    return (
                      <div
                        key={idx}
                        data-item
                        className="py-1.5 sm:py-2 ml-2 sm:ml-4"
                      >
                        <span
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          onClick={() =>
                            handleCityClick(idx % destinations.length)
                          }
                          className={`cursor-pointer text-sm sm:text-base md:text-lg font-quicksand transition ${
                            isActive
                              ? "text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {place.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Search Box */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                <div className="w-full max-w-[500px] flex sm:flex-row gap-2 relative">
                  {/* Input */}
                  <input
                    type="text"
                    value={inputValue}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tell us your destination..."
                    className="w-full bg-[#f8f4e8] text-black px-4 py-2 focus:outline-none font-quicksand"
                  />

                  {/* Button */}

                  {/* <button
                    onClick={handleGo}
                    onMouseEnter={() => setIsPaused(true)}
                    className="bg-[#77775b] text-white px-4 py-2 uppercase cursor-pointer tracking-wide"
                  >
                    Go
                  </button> */}

                  <Link
                    href={selectedDestination.path}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="bg-[#77775b] text-white px-4 py-2 uppercase cursor-pointer tracking-wide flex items-center justify-center"
                  >
                    Go
                  </Link>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 mt-2 w-full bg-white/95 text-black rounded-lg shadow-lg z-50">
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => handleSuggestionClick(s.name)}
                          className={`px-4 py-2 cursor-pointer ${
                            i === highlightIndex
                              ? "bg-gray-300"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-10 text-white/90 text-xs sm:text-sm">
              {active.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
