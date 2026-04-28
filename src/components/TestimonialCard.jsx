import "./TestimonialCard.css";

const TestimonialCard = ({ profile, travelername, mainquote, para }) => {
  return (
    <div className="tesmoni-crad">
      <div className="row review-main-card">
        <div className="col-md-3">
          <div className="rev_pico">
            <img src={profile} alt={travelername} className="w-100" />
          </div>
        </div>
        <div className="col-md-9">
          <div className="review_main_rig_con">
            <h4 className=" capitalize">{travelername}</h4>
            <h5 >{mainquote}</h5>
            <ul className="rating-star_review">
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <img src="/star-rating.svg" alt="star" className=" " />
                </li>
              ))}
            </ul>
            <p className=" font-quicksand">{para}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
