import FrameComponent1 from "../components/FrameComponent1";
import Container1 from "../components/Container1";
import FrameComponent from "../components/FrameComponent";
import Container from "../components/Container";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="frame-parent">
        <FrameComponent1 />
        <Container1 />
      </section>
      <section className="container-17-parent">
        <div className="container-17">
          <div className="container-17-inner">
            <div className="traditional-heritage-modern-r-parent">
              <h1 className="traditional-heritage-modern">
                Traditional Heritage, Modern Result
              </h1>
              <div className="one-of-the">{`One of the reasons for poke's popularity is its versatility. While the traditional version remains a favorite, there are now numerous variations available, allowing people to customize their poke bowls according to their preferences. `}</div>
            </div>
          </div>
          <div className="image-26" />
          <img
            className="image-24-icon"
            loading="lazy"
            alt=""
            src="/image-24@2x.png"
          />
        </div>
        <FrameComponent />
        <Container />
      </section>
    </div>
  );
};

export default AboutUs;
