import React from "react";
import FancyTitle from "./FancyTitle";
import '../css/InfoSection.css';

const InfoSection = ({data,reverse, className}) => {
    return (
        <div className={"w-full bg-white flex justify-center pb-8"+" "+(className || "")}>
            <div className={`flex w-[1140px] gap-10 ${reverse?"flex-row-reverse":""}`}>
              <div className="space-y-8 pt-4 flex flex-col justify-start items-start" >

                  <FancyTitle content={data.title} />
                  <p className="font-[300] text-[1rem]">
                      {data.description}
                  </p>
                  <div className=" h-10 overflow-hidden w-52 flex items-center justify-center">
                      <a className="relative z-10 bg-lightBlue before:bg-lightBlue pr-6 pl-8 py-2 text-white font-[500] action-button" href="/about">
                          <p className="z-10">{data.buttonText}</p>
                      </a>
                  </div>
              </div>
              <div className=" flex justify-center items-start">
                    <img
                        src={data.imgSrc}
                        alt="contact"
                        className="w-[550px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
