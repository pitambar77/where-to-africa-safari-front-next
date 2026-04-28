
import "./SafariItinerary.css";

const TourHighlights = ({ tourpic, tourovercon, tourtitt, para }) => {

    return(
        <div className="tour_heig_card">
            <div className="tours_heipico">
                <img src={tourpic} alt="" className="w-100"/>
                <h4>{tourovercon}</h4>
            </div>
            <div className="heigh_para-box">
                <h3>{tourtitt}</h3>
                <p>{para}</p>
            </div>
        </div>
    );
};
export default TourHighlights;