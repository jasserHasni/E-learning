import "../css/HomePage.css";
import FooterSection from "./FooterSection.jsx";
import ContactSection from "./ContactSection.jsx";
import ShowcaseMenu from "./ShowcaseMenu.jsx";
import InfoSection from "./InfoSection.jsx";
import data from "../../data.json";
const HomePage = () => {
    return (
        <div className="">
            {/* showcase */}
            <div
                className="w-full pb-[49.5%] bg-contain bg-center relative mb-32"
                style={{ backgroundImage: "url('/images/banner_img.png')" }}
            >
                {/* little menu */}
                <ShowcaseMenu />
            </div>
            {/* page sections */}
            {/* page footer */}
            <div className="flex flex-col items-center space-y-10">
            <InfoSection data={data.infoSections.section1} />
            <InfoSection data={data.infoSections.section2} reverse className="bg-gray-300"/>
            <InfoSection data={data.infoSections.section3} />
            <ContactSection />
            </div>
            <FooterSection />

        </div>
    );
};

export default HomePage;
