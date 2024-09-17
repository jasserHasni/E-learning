const FooterSection = () => {
    return (
        <footer className="w-full bg-footerBlue flex justify-center py-14">
            <div className="w-[1140px] grid grid-cols-4 gap-4">
                <div className="flex flex-col space-y-8 -translate-y-[3px]">
                    <img    
                        src="/images/footer_logo.png"
                        className="w-56 h-12"
                        alt=""
                    />
                    <p className="text-white font-thin ">
                        Bienvenue sur notre plateforme éducative ! Nous
                        proposons une vaste gamme de documents pédagogiques et
                        organisons des sessions en direct pour les étudiants.
                    </p>
                </div>
                <div className="flex flex-col">
                    <h2 className="capitalize text-2xl text-white font-semibold border-b-2 border-solid border-b-yellow self-start w-full py-2">
                        navigation
                    </h2>
                    <ul className="flex flex-col grow pt-8 space-y-3 text-white list-['>'] font-[200]">
                        <li className="cursor-pointer">Cours</li>
                        <li className="cursor-pointer">Contact</li>
                        <li className="cursor-pointer">Documents</li>
                        <li className="cursor-pointer">Formation</li>
                        <li className="cursor-pointer">A propos</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <h2 className="capitalize text-2xl text-white font-semibold border-b-2 border-solid border-b-yellow self-start w-full py-2">
                        newsletter
                    </h2>
                    <form className="flex flex-col space-y-2 pt-8 items-start">
                        <input
                            className="rounded-md py-1 px-2 w-full"
                            type="text"
                            placeholder="Email"
                        />
                        <button className="bg-yellow px-6 py-2 rounded-md text-white text-sm font-bold shadow-sm">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="flex flex-col space-y-8">
                    <h2 className="capitalize text-2xl text-white font-semibold border-b-2 border-solid border-b-yellow self-start w-full py-2">
                        contact
                    </h2>
                    <ul className="flex flex-col text-white space-y-3"> 
                        <li className="flex gap-3">
                            <img className="h-7 w-7" src="/images/i5.png" />
                            <span>
                                Nabeul
                                <br />
                                Tunisie
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <img className="h-7 w-7" src="/images/i6.png" />
                            <span>email@gmail.com</span>
                        </li>
                        <li className="flex gap-3">
                            <img className="h-7 w-7" src="/images/i7.png" />
                            <span>+21629722048</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
