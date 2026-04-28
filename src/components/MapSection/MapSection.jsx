"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapSection() {
  const [activeLocation, setActiveLocation] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(null);
  const markersRef = useRef([]);
  const coordsCache = useRef({});

  const getBoundsFromRegions = async (regions) => {
    const bounds = new mapboxgl.LngLatBounds();

    for (const region of regions) {
      const coords = await getCoordinates(region.name);
      if (coords) {
        bounds.extend(coords);
      }
    }

    return bounds;
  };

  const locations = [
    {
      id: 1,
      title: "Botswana",
      tours: 5,

      des: "Legend says that Ngorongoro Crater in Tanzania was the Garden of Eden, and it's still lush with forest, pasture, lakes, and animal life, not far from Oldupai, where some of the oldest human fossils have been found. The largest beasts on the planet still roam Africa, tribes still follow ancient ways and traditions, and you can't help but feel the pulse of a primal connection, and hear echoes of a distant past in the magnificent, unique, breathtaking landscapes.",
      link: "/botswana",

      regions: [
        {
          name: "Chobe and Khwai",
          tours: 3,
          link: "botswana/chobe-and-khwai",
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Kalahari Desert",
          tours: 2,
          link: "botswana/kalahari-desert",
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Kalahari Desert",
          tours: 2,
          link: "botswana/okavango-delta-and-moremi-game-reserve",
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
      ],
    },

    {
      id: 2,
      title: "Kenya",
      tours: 8,

      des: "Legend says that Ngorongoro Crater in Tanzania was the Garden of Eden, and it's still lush with forest, pasture, lakes, and animal life, not far from Oldupai, where some of the oldest human fossils have been found. The largest beasts on the planet still roam Africa, tribes still follow ancient ways and traditions, and you can't help but feel the pulse of a primal connection, and hear echoes of a distant past in the magnificent, unique, breathtaking landscapes.",
      link: "/kenya",
      regions: [
        {
          name: "Maasai Mara",
          tours: 5,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Amboseli",
          tours: 3,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Nairobi",
          tours: 3,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Zambia",
          tours: 3,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
      ],
    },

    {
      id: 3,
      title: "South Africa",
      tours: 10,
      link: "/south-africa",
      image:
        "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
      des: "All South Africa packages",

      regions: [
        {
          name: "Kruger National",
          tours: 6,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
        {
          name: "Cape Town",
          tours: 4,
          image:
            "https://assets.cntraveller.in/photos/613649a8b608619ba75f7154/16:9/w_1024%2Cc_limit/Botswana_elephants_GettyImages-534898061.jpg",
        },
      ],
    },
  ];

  const getCoordinates = async (place) => {
    if (coordsCache.current[place]) {
      return coordsCache.current[place];
    }

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${mapboxgl.accessToken}`,
      );
      const data = await res.json();
      const coords = data.features?.[0]?.center;

      if (coords) {
        coordsCache.current[place] = coords; // ✅ store
      }

      return coords;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    if (map.current) return;

    // 🧹 CLEAR MARKERS
    const clearMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };

    // 🌍 COUNTRY MARKER (CARD STYLE)
    const createCountryMarker = (title, tours) => {
      const el = document.createElement("div");

      el.style.background = "white";
      el.style.padding = "12px 18px";
      el.style.textAlign = "center";
      el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      el.style.borderRadius = "4px";
      el.style.position = "relative";
      el.style.cursor = "pointer";
      el.style.width = "150px";

      el.innerHTML = `
      <div style="font-size:20px;color:#333;">${title}</div>
      <div style="font-size:12px;letter-spacing:2px;color:#7BAE37;margin-top:4px;">
        ${tours} TOURS
      </div>
    `;

      const pointer = document.createElement("div");
      pointer.style.position = "absolute";
      pointer.style.bottom = "-8px";
      pointer.style.left = "50%";
      pointer.style.transform = "translateX(-50%)";
      pointer.style.borderLeft = "8px solid transparent";
      pointer.style.borderRight = "8px solid transparent";
      pointer.style.borderTop = "8px solid white";

      el.appendChild(pointer);

      return el;
    };

    // 📍 REGION MARKER (PIN STYLE)
    const createRegionMarker = (count) => {
      const el = document.createElement("div");

      el.style.width = "36px";
      el.style.height = "36px";
      el.style.background = "white";
      el.style.border = "3px solid #ab8c51";
      el.style.borderRadius = "50%";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.fontWeight = "600";
      el.style.color = "#ab8c51";
      el.style.position = "relative";
      el.style.cursor = "pointer";

      el.innerText = count;

      const tail = document.createElement("div");
      tail.style.position = "absolute";
      tail.style.bottom = "-10px";
      tail.style.left = "50%";
      tail.style.transform = "translateX(-50%)";
      tail.style.borderLeft = "8px solid transparent";
      tail.style.borderRight = "8px solid transparent";
      tail.style.borderTop = "10px solid #ab8c51";

      el.appendChild(tail);

      return el;
    };

    // 🪟 POPUP

    const createPopupHTML = (region) => {
      return `
  <div style="
    width:90vw;
max-width:300px;
    font-family:serif;
    background:white;
    box-shadow:0 20px 50px rgba(0,0,0,0.3);
    position:relative;
    
    
  ">

    <!-- ❌ CLOSE BUTTON -->
    <div class="popup-close-btn" style="
      position:absolute;
      top:10px;
      right:12px;
      z-index:10;
      color:white;
      font-size:20px;
      cursor:pointer;
      background:rgba(0,0,0,0.4);
      width:28px;
      height:28px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:50%;
    ">
      ✕
    </div>

    <div style="position:relative;height:180px;overflow:hidden;">
      <img src="${region.image}" 
        style="width:100%;height:100%;object-fit:cover;" 
      />

      <div style="
        position:absolute;
        inset:0;
        background:linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      "></div>

      <div style="
        position:absolute;
        bottom:20px;
        left:20px;
        color:white;
      ">
        <h2 style="margin:0;font-size:28px;">
          ${region.name}
        </h2>
      </div>

      <div style="
        position:absolute;
        bottom:20px;
        right:20px;
        color:white;
        text-align:right;
      ">
        <div style="font-size:26px;">${region.tours}</div>
        <div style="font-size:12px;letter-spacing:2px;">TOURS</div>
      </div>
    </div>

    <div style="
      padding:5px;
      text-align:center;
      color:#7BAE37;
      font-weight:600;
    ">
      See All ${region.name} Tours →
    </div>

    <div style="
      width:0;
      height:0;
      border-left:12px solid transparent;
      border-right:12px solid transparent;
      border-top:12px solid white;
      margin:0 auto;
    "></div>
  </div>
  `;
    };

    // 📍 RENDER REGIONS
    const renderRegions = async (loc) => {
      clearMarkers();

      for (const region of loc.regions || []) {
        const coords = await getCoordinates(region.name);
        if (!coords) continue;

        const el = createRegionMarker(region.tours);

        el.addEventListener("click", () => {
          map.current.flyTo({
            center: coords,
            zoom: 7,
          });

          if (popupRef.current) popupRef.current.remove();

          // popupRef.current = new mapboxgl.Popup({
          //   offset: [0, -40],
          //   closeButton: false, // ❌ disable default
          //   closeOnClick: false,
          // })
          const isMobile = window.innerWidth < 640;

          popupRef.current = new mapboxgl.Popup({
            offset: isMobile ? [0, -20] : [0, -40],
            anchor: isMobile ? "bottom" : "top",
            closeButton: false,
            closeOnClick: false,
            maxWidth: isMobile ? "90vw" : "300px", // 🔥 add this
          })
            .setLngLat(coords)
            .setHTML(createPopupHTML(region))
            .addTo(map.current);

          // ✅ attach close event
          setTimeout(() => {
            const closeBtn = document.querySelector(".popup-close-btn");
            if (closeBtn) {
              closeBtn.onclick = () => popupRef.current?.remove();
              closeBtn.onmouseover = () => {
                closeBtn.style.background = "rgba(0,0,0,0.7)";
              };
              closeBtn.onmouseout = () => {
                closeBtn.style.background = "rgba(0,0,0,0.4)";
              };
            }
          }, 0);
        });

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
          offset: [0, -6],
        })
          .setLngLat(coords)
          .addTo(map.current);

        markersRef.current.push(marker);
      }
    };

    const renderCountries = async () => {
      //   if (markersRef.current.length > 0) return; // 🚀 prevent duplicate

      clearMarkers();

      for (const loc of locations) {
        const coords = await getCoordinates(loc.title);
        if (!coords) continue;

        const el = createCountryMarker(loc.title, loc.tours);

        // el.addEventListener("click", () => {
        //   setActiveLocation(loc);

        //   map.current.flyTo({
        //     center: coords,
        //     zoom: 5,
        //     duration: 800,
        //   });

        //   renderRegions(loc);
        // });

        el.addEventListener("click", async () => {
          setActiveLocation(loc);

          // ✅ NEW LOGIC
          const bounds = await getBoundsFromRegions(loc.regions);

          if (!bounds.isEmpty()) {
            map.current.fitBounds(bounds, {
              padding: window.innerWidth < 768 ? 40 : 80,
              maxZoom: 6,
              duration: 800,
            });
          }

          renderRegions(loc);
        });

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
          offset: [0, -6],
        })
          .setLngLat(coords)
          .addTo(map.current);

        markersRef.current.push(marker);
      }
    };

    const isMobileScreen = window.innerWidth < 768;

    // 🗺 INIT MAP
    const initMap = () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/navigation-day-v1",
      });

      // ❌ disable scroll zoom by default
      map.current.scrollZoom.disable();

      // map.current.fitBounds(
      //   [
      //     [-20, -35],
      //     [55, 20],
      //   ],
      //   { padding: 80 },
      // );

      map.current.fitBounds(
        [
          [-20, -35],
          [55, 20],
        ],
        {
          padding: isMobileScreen ? 40 : 80,
          maxZoom: isMobileScreen ? 4.5 : 3.5,
        },
      );

      map.current.on("load", () => {
        map.current.setPaintProperty("water", "fill-color", "#f9f4ec");
        map.current.setPaintProperty("land", "background-color", "#f7e0b5");

        if (map.current.getLayer("landcover")) {
          map.current.setPaintProperty("landcover", "fill-color", "#f7e0b5");
        }

        if (map.current.getLayer("road")) {
          map.current.setPaintProperty("road", "line-color", "#ae8134");
        }

        if (!map.current.getLayer("country-borders")) {
          map.current.addLayer({
            id: "country-borders",
            type: "line",
            source: "composite",
            "source-layer": "admin",
            filter: ["==", "admin_level", 0],
            paint: {
              "line-color": "#c2baa5",
              "line-width": 1.2,
              "line-opacity": 0.7,
            },
          });
        }

        if (!map.current.getLayer("region-borders")) {
          map.current.addLayer({
            id: "region-borders",
            type: "line",
            source: "composite",
            "source-layer": "admin",
            filter: ["==", "admin_level", 1],
            paint: {
              "line-color": "#ab8c51",
              "line-width": 0.6,
              "line-opacity": 0.5,
            },
          });
        }
        map.current.getStyle().layers.forEach((layer) => {
          if (layer.type === "symbol" && layer.layout?.["text-field"]) {
            map.current.setLayoutProperty(layer.id, "text-font", [
              "Open Sans Regular",
              "Arial Unicode MS Regular",
            ]);
          }
        });
        map.current.getStyle().layers.forEach((layer) => {
          if (layer.type === "symbol" && layer.layout?.["text-field"]) {
            map.current.setLayoutProperty(layer.id, "text-size", 12); // 🔥 smaller text
          }
        });

        renderCountries();
      });
    };

    requestAnimationFrame(initMap);

    return () => map.current?.remove();
  }, []);

  return (
    <>
      <div className=" ">
        <div className=" text-center px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28 flex flex-col items-center bg-white mb-4 md:mb-8">
          <p className=" text-[#a89f82] uppercase text-xs sm:text-base font-quicksand">
            Land Tours & Cruises
          </p>
          <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-8 mt-3 text-[#636363] font-cormorant">
            Explore The Possibilities
          </h5>
        </div>

        <div className="relative w-full  overflow-hidden font-quicksand">
          {/* MAP */}
          <div
            ref={mapContainer}
            className="absolute top-0 left-0 w-full md:h-[80vh] h-[80vh]"
          />

          {/* LEFT PANEL */}

          {activeLocation && (
            <div className=" hidden sm:block absolute top-10 left-20 w-[420px] bg-white p-6 shadow-xl rounded-md z-10 transition-all duration-300">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setActiveLocation(null);

                  map.current.fitBounds(
                    [
                      [-20, -35],
                      [55, 20],
                    ],
                    { padding: 80 },
                  );

                  markersRef.current.forEach((m) => m.remove());
                  markersRef.current = [];

                  setTimeout(() => {
                    map.current.fire("load");
                  }, 100);
                }}
                className="absolute top-3 right-3 text-lg text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* HEADER */}
              <p className="text-green-600 text-xs tracking-[3px] uppercase">
                {activeLocation.title}
              </p>

              <h2 className="text-xl font-serif mt-2 leading-snug">
                Explore {activeLocation.title}
              </h2>

              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                {activeLocation.des}
              </p>

              {/* SECTION */}
              <div className="mt-6">
                <h3 className="text-green-600 tracking-[4px] text-xs font-medium mb-4 uppercase">
                  Safaris & Journeys
                </h3>

                {/* GRID (FIXED → 1 COLUMN for small card) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-2xl font-light text-gray-700 leading-none">
                      {activeLocation.tours}
                    </h3>
                    <p className="text-gray-400 tracking-widest text-[11px] uppercase mt-1">
                      Packages
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href={activeLocation.link}
                    className="text-green-600 text-sm font-semibold flex items-center justify-between group"
                  >
                    <span>See All {activeLocation.title} Tours</span>

                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
