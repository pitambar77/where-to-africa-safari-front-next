import "./WhyTravelCard.css";

const WhyTravelCard = ({ image, title, content }) => {
    return (
        <div className="why-us-card">
            <div className="">
                <img src={image} alt={title} className="w-100" />
            </div>
            <div className="why-us-content">
                <h4>{title}</h4>
                <p>{content}</p>
            </div>
        </div>
    );
};
export default WhyTravelCard;
