import Link from "next/link";
import "./safariPackBox.css";
import Image from "next/image";

const SafariPackBox = ({
  image = "/placeholder.jpg",
  title = "Safari Package",
  price = "",
  link = "#",
}) => {
  return (
    <div className="safari-card-box">
      <Link href={link || "#"}>
        <div className="relative w-full h-[550px]">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title || "Safari"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center"
          />
        </div>

        <div className="packes_over_content">
          <h6>View</h6>

          <h4>{title || "Untitled Package"}</h4>

          <p className="oric-hmo-njnj">From: {price || "Contact Us"}</p>
        </div>
      </Link>
    </div>
  );
};

export default SafariPackBox;
