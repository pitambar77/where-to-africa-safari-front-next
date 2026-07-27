// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import Partner from "@/components/Partner";
// import TalkExpert from "@/components/TalkExpert";
// import Testimonial from "@/components/Testimonial";
// export default function WebsiteLayout({ children }) {
//   return (
//     <>
//       <Header />
//       {children}
//       <Testimonial />
//       <TalkExpert />
//       <Partner />
//       <Footer />
//     </>
//   );
// }

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partner from "@/components/Partner";
import TalkExpert from "@/components/TalkExpert";
import Testimonial from "@/components/Testimonial";

async function getDestinations() {
  const res = await fetch(`${process.env.API_BASE}/api/destinations`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function WebsiteLayout({ children }) {
  const destinations = await getDestinations();

  return (
    <>
      <Header destinations={destinations} />
      {children}
      <Testimonial />
      <TalkExpert />
      <Partner />
      <Footer />
    </>
  );
}
