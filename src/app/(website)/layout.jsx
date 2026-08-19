import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partner from "@/components/Partner";
import TalkExpert from "@/components/TalkExpert";
import Testimonial from "@/components/Testimonial";

export const metadata = {
  verification: {
    google: "rzoWX3TnJMVHfK3RdmL8v-A7KVPFldmNUsAyzFnbu0M",
  },
};

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
      {/* Google Ads */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-606402815"
        strategy="afterInteractive"
      />

      <Script id="google-ads">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-606402815');
        `}
      </Script>

      {/* Google Analytics */}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-174652433-1"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-174652433-1');
        `}
      </Script>

      <Header destinations={destinations} />
      {children}
      <Testimonial />
      <TalkExpert />
      <Partner />
      <Footer />
    </>
  );
}
