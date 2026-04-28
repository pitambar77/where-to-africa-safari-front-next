import React from "react";
import TravelguideSection from "../../components/TravelguideSection";
import Banner from "../../components/Banner";

import { TbHandFingerRight } from "react-icons/tb";

export const articleData = {
  title: "Kilimanjaro Altitude Sickness",
  intro:
    "Climbing Mount Kilimanjaro is a thrilling adventure, but as you ascend to higher altitudes, the air becomes thinner and oxygen levels drop, which can lead to altitude sickness.",
  sections: [
    {
      heading: "What Happens to Your Body at High Altitude",
      description:
        "The reduced air pressure and oxygen levels mean your body must work harder to deliver oxygen to muscles and organs. Symptoms often include headache, nausea, and fatigue.",
      list: [
        "Headache or dizziness",
        "Shortness of breath during mild activity",
        "Loss of appetite and disturbed sleep",
      ],
      image: "/images/altitude1.jpg",
    },
    {
      heading: "Types of Altitude Sickness on Kilimanjaro",
      subsections: [
        {
          title: "Acute Mountain Sickness (AMS)",
          description:
            "This is the mildest and most common form of altitude sickness. It can occur at elevations above 2,500 meters (8,000 ft).",
          list: [
            "Nausea and vomiting",
            "Insomnia and fatigue",
            "Swelling of hands and feet",
          ],
        },
        {
          title: "High Altitude Pulmonary Edema (HAPE)",
          description:
            "A severe form that affects the lungs, causing breathing difficulties and fluid buildup.",
          list: [
            "Severe shortness of breath",
            "Coughing with pink frothy sputum",
            "Bluish skin or lips (cyanosis)",
          ],
        },
      ],
      image: "/images/sunrise.jpg",
    },
    {
      heading: "Best Acclimatization Strategies",
      description:
        "Gradual ascent is the best prevention. Spend extra nights at intermediate altitudes to let your body adjust.",
      list: [
        "Climb high, sleep low principle",
        "Take rest days for acclimatization",
        "Avoid alcohol and stay hydrated",
      ],
      image: "/images/acclimatization.jpg",
    },
    {
      heading: "How to Prevent Altitude Sickness on Kilimanjaro",
      description:
        "Prevention is better than cure. Follow these steps to reduce your risk of altitude sickness.",
      list: [
        "Choose routes with gradual ascent",
        "Take Diamox (if prescribed)",
        "Stay hydrated and eat light meals",
      ],
      image: "/images/prevention.jpg",
    },
    {
      heading: "Emergency Safety on Kilimanjaro",
      description:
        "Guides carry oxygen cylinders and pulse oximeters. In severe cases, descent is mandatory.",
      list: [
        "Report symptoms early",
        "Use supplemental oxygen when necessary",
        "Descend immediately if symptoms worsen",
      ],
      image: "/images/safety.jpg",
    },
  ],
};

const TravelGuideDetailsPage = () => {
  return (
    <>
      <div>
        <Banner
          imageUrl={
            "https://media-01.imu.nl/storage/ourplanetinmylens.com/21978/safari-guide-training-kenya-2558x1100-1.jpg"
          }
          title={"Kilimanjaro Altitude Sickness"}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* SECTION 1 */}
        <section className="mb-12 font-quicksand ">
          <h2 className="text-4xl  mb-8 mt-4 text-[#636363] capitalize font-cormorant tracking-wide font-semibold ">
            What Happens to Your Body at High Altitude
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The air on Kilimanjaro feels different the higher you go—not because
            there’s less oxygen in the atmosphere (it’s still 20.9%) but because{" "}
            <span className="font-semibold">the air pressure decreases</span>.
            This means every breath you take delivers fewer oxygen molecules to
            your lungs.
          </p>

          <img
            src="https://masai-mara.in/wp-content/uploads/2024/01/image8.webp"
            alt=""
            className="rounded-sm shadow-sm w-full h-[560px]"
          />

          <ul className="space-y-3 text-gray-700 text-lg  my-8 ml-6 font-quicksand ">
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1  text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                At the summit, oxygen is{" "}
                <span className="font-semibold">reduced by almost half</span>{" "}
                compared to sea level.
              </span>
            </li>
            <li className="flex gap-2 ">
              <span className="text-[#d5aa4f] mt-1  text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                The body reacts by breathing faster, increasing heart rate, and
                producing more red blood cells.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                These adjustments, known as{" "}
                <span className="font-semibold">acclimatization</span>, take
                time, and rushing the climb increases your risk of altitude
                sickness.
              </span>
            </li>
          </ul>

          <img
            src="https://www.safaritravelplus.com/travel/wp-content/uploads/2024/08/best-nairobi-safaris.jpg"
            alt="High Altitude View"
            className="rounded-sm shadow-sm w-full"
          />
        </section>

        {/* SECTION 2 */}
        <section>
          <h2 className="text-4xl mb-4 text-[#636363] capitalize font-cormorant font-semibold  tracking-wide">
            Types of Altitude Sickness on Kilimanjaro
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-8 font-quicksand">
            Altitude sickness is not one single condition. It ranges from mild
            discomfort to life-threatening illnesses. Here are the main types:
          </p>

          {/* AMS */}
          <h3 className="text-3xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mb-4">
            Acute Mountain Sickness (AMS)
          </h3>

          <p className="text-gray-700 mb-4 text-lg font-quicksand">
            Many trekkers above 3,000 meters experience the most common form of{" "}
            <span className="font-semibold">Kilimanjaro Altitude Sickness</span>
            .
          </p>

          <ul className="space-y-3 text-gray-700 my-8 ml-6 font-quicksand text-lg">
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                <span className="font-semibold ">Mild AMS:</span> Feels like a
                hangover—headache, nausea, fatigue, and reduced appetite. Rest,
                fluids, and slow climbing usually resolve it.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                <span className="font-semibold">Moderate AMS:</span> More
                intense symptoms like vomiting, dizziness, and difficulty
                sleeping. At this stage, you may need to descend.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1  text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                <span className="font-semibold">Severe AMS:</span> Can be
                life-threatening, confusing, inability to walk correctly, and
                extreme fatigue. Immediate descent is mandatory.
              </span>
            </li>
          </ul>

          {/* HAPE */}
          <h3 className="text-3xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mb-4">
            High Altitude Pulmonary Edema (HAPE)
          </h3>

          <p className="text-gray-700 mb-4 font-quicksand text-lg">
            This occurs when fluid builds up in the lungs, making breathing
            extremely difficult. It can happen suddenly and even without
            apparent AMS symptoms.
          </p>

          <h4 className="text-3xl font-medium text-[#636363] font-cormorant mb-2">
            Warning signs:
          </h4>
          <ul className="space-y-2 text-gray-700 mb-4 ml-6 font-quicksand">
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1  text-xl">
                <TbHandFingerRight />
              </span>
              <span>Breathlessness even at rest.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>
                Persistent cough (sometimes with pink froth or blood).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f]  mt-1 text-xl">
                <TbHandFingerRight />
              </span>
              <span>Blue lips or fingernails.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#d5aa4f] mt-1  text-xl">
                <TbHandFingerRight />
              </span>
              <span>Extreme tiredness, confusion, or collapse.</span>
            </li>
          </ul>

          <p className="text-gray-700 mb-6 font-quicksand text-lg">
            HAPE is a medical emergency; oxygen and immediate evacuation are
            essential.
          </p>

          {/* HACE */}
          <h3 className="text-3xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mb-4">
            High Altitude Cerebral Edema (HACE)
          </h3>

          <p className="text-gray-700 font-quicksand text-lg leading-relaxed ">
            A rare but hazardous condition where fluid accumulates in the brain.
            It often develops after untreated AMS.
          </p>

          <h3 className="text-3xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mt-6 mb-4">
            Other Health Considerations While Climbing
          </h3>
          <h4 className="text-2xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mb-4">
            Sleep Disturbances
          </h4>
          <p className=" text-gray-700 font-quicksand text-lg tracking-wide mb-4 ">
            Uneven breathing patterns (Cheyne-Stokes) are common at altitude. It
            feels uncomfortable, but it isn’t usually dangerous. Diamox can
            sometimes help regulate it.
          </p>

          <h4 className="text-2xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mb-4">
            Sleep Disturbances
          </h4>
          <p className=" text-gray-700 font-quicksand text-lg tracking-wide mb-4 ">
            Uneven breathing patterns (Cheyne-Stokes) are common at altitude. It
            feels uncomfortable, but it isn’t usually dangerous. Diamox can
            sometimes help regulate it.
          </p>

          <h4 className="text-2xl  text-[#636363] capitalize font-cormorant font-semibold tracking-wide mb-4">
            Sleep Disturbances
          </h4>
          <p className=" text-gray-700 font-quicksand text-lg tracking-wide mb-4">
            Uneven breathing patterns (Cheyne-Stokes) are common at altitude. It
            feels uncomfortable, but it isn’t usually dangerous. Diamox can
            sometimes help regulate it.
          </p>

          <img
            src="https://masai-mara.in/wp-content/uploads/2024/01/image8.webp"
            alt=""
            className="rounded-sm shadow-sm w-full h-[560px] my-10"
          />
          <h3 className="text-3xl  text-[#636363] capitalize font-cormorant font-semibold  tracking-wide mt-6 mb-4">
            Staying Strong at High Altitude
          </h3>
          <p className=" text-gray-700 font-quicksand text-lg tracking-wide mb-4">
            Altitude sickness is the most significant challenge on Mount
            Kilimanjaro—but it doesn’t have to prevent you from reaching the
            summit. The key lies in knowledge, patience, and preparation. By
            climbing slowly, drinking plenty of water, eating well, and paying
            attention to your body’s signals, you give yourself the best chance
            of success. With experienced guides and a good acclimatization plan,
            most climbers adapt safely and proudly stand on the Roof of Africa.
          </p>
        </section>
      </div>
    </>
  );
};

export default TravelGuideDetailsPage;
