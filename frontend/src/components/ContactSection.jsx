const ContactSection = () => {
    return (
        <div className="w-full bg-contactBlue flex justify-center min-h-[600px] pb-20">
            <div className="grid grid-cols-2 w-[1140px] h-full gap-8">
                <div className=" flex justify-center items-start">
                    <img
                        src="/images/img10.png"
                        alt="contact"
                        className="w-[550px]"
                    />
                </div>
                <form className="flex flex-col gap-2 justify-center space-y-6 items-center pt-[6.5rem]">
                    <input
                        className="h-14 text-lg p-6 rounded-sm shadow-sm w-full"
                        type="text"
                        placeholder="Nom"
                        name="Nom"
                        id="Name"
                    />
                    <input
                        className="h-14 text-lg p-6 rounded-sm shadow-sm w-full"
                        type="text"
                        placeholder="Email"
                        name="Email"
                        id="Email"
                    />
                    <input
                        className="h-14 text-lg p-6 rounded-sm shadow-sm w-full"
                        type="text"
                        placeholder="Numéro de Téléphone"
                        name=" Numéro de Téléphone"
                        id="phone_number"
                    />
                    <textarea
                        className="h-32 p-6 w-full text-lg"
                        placeholder="Message"
                        name="Message"
                        id="Message"
                    ></textarea>
                    <button className="uppercase bg-yellow px-12 py-4 text-white font-bold text-lg shadow-sm">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;
