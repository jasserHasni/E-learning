import React, { useEffect, useState } from "react";

const NavBar = () => {
    const [isScrolled,setIsScrolled] = useState(false);
    const [isHalfScrolled, setIsHalfScrolled] = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY>150 && window.scrollY<200 ){
                setIsHalfScrolled(true);
            }
            else if (window.scrollY>200){
                setIsScrolled(true);
                setIsHalfScrolled(false);
            }else{
                setIsScrolled(false);
                setIsHalfScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll)

        // useEffect cleanup (something new i learned :D )
        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    },[])
    const loggedIn = true;
    return (
        <nav className={`h-20 bg-white left-1/2 -translate-x-1/2 flex px-4  top-0 shadow-md rounded-sm z-50 transition-all duration-300 ease-in-out ${isHalfScrolled?"opacity-0":"opacity-100"} ${isScrolled? "w-full fixed" : "w-[90%] absolute"}`}>
            <div className="flex flex-row w-full grow justify-between items-center">
                <div>
                    <img src="images/logo.png" className="w-72"/>
                </div>
                <button
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar-wd"
                    aria-controls="navbar-wd"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="flex flex-row items-center">
                    <ul className="list-none flex flex-row gap-12 text-sm uppercase">
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/">Acceuil</a>
                        </li>
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/about">A propos</a>
                        </li>
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/courses">Séances</a>
                        </li>
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/reaserch">Documents</a>
                        </li>
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/formation">Formations</a>
                        </li>
                        <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                            <a href="/contact">Contact</a>
                        </li>
                        {loggedIn ? (
                            <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                                <a href="/logout">Logout</a>
                            </li>
                        ) : (
                            <li className="hover:cursor-pointer text-black ease-in-out transition-all duration-300 hover:text-yellow">
                                <a href="/login">Login</a>
                            </li>
                        )}
                    </ul>
                {/* spacer */}
                <div className="h-12 w-20"></div>   
                </div>

            </div>
        </nav>
    );
};

export default NavBar;
