import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Partner from "@/components/Partner";
import TalkExpert from "@/components/TalkExpert";
import Testimonial from "@/components/Testimonial";
export default function WebsiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Testimonial />
      <TalkExpert />
      <Partner />
      <Footer />
    </>
  );
}
