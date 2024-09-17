const ShowcaseMenu = () => {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white  rounded-md shadow-md overflow-hidden w-[1140px] flex justify-center ">
            <ul className="flex space-x-14 items-center justify-between w-full">
                <div className="flex space-x-14 items-center py-6 grow justify-center ">
                    <li className="">
                        <a
                            className="flex flex-col items-center justify-center "
                            href="/about"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/images/i2.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500] text-black">
                                Matières
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex flex-col items-center justify-center relative"
                            href="/about"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage:
                                        "url('/images/images.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500] text-black">
                                Documents
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex flex-col items-center justify-center relative"
                            href="/about"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage:
                                        "url('/images/formation.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500] text-black">
                                Formations
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex flex-col items-center justify-center relative"
                            href="/about"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/images/i4.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500] text-black">
                                Social
                            </span>
                        </a>
                    </li>
                </div>
                <div className="flex justify-center grow relative before:bg-darkBlue after:z-0 after:bg-yellow before:z-0 space-x-14 items-center contact-info bg-darkBlue outline-[40px 0] outline outline-darkBlue py-6 text-white">
                    <li>
                        <a
                            className="flex flex-col items-center justify-center z-10 relative"
                            href="/contact"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/images/i5.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500]">
                                Localisation
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex flex-col items-center justify-center relative"
                            href="/contact"
                        >
                            <div
                                className="h-10 w-10 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/images/i6.png')",
                                }}
                            ></div>
                            <span className="text-lg font-[500] ">Email</span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex flex-col items-center justify-center relative"
                            href="/contact"
                        >
                            <div
                                className="h-10 w-10 bg-center"
                                style={{
                                    backgroundImage: "url('/images/i7.png')",
                                    backgroundSize: "110% 110%",
                                }}
                            ></div>
                            <span className="text-nowrap font-[500] ">
                                Appelez-nous
                            </span>
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default ShowcaseMenu;
