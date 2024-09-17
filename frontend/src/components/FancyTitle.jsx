import "../css/FancyTitle.css";

const FancyTitle = ({ content, className }) => {
    const splitContent = content ? content.split("/") : [];

    return (
        <h2 className={"max-w-fit text-black after:bg-yellow before:bg-darkBlue text-[2.5rem] font-raleway font-[700] relative fancy-title" + " " + (className || "")} >
            <span className="text-lightBlue">
                {splitContent[0] ? splitContent[0] + " " : ""}
            </span>
            {splitContent[1]?splitContent[1]:""}
        </h2>
    );
};

export default FancyTitle;
