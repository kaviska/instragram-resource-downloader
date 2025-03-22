
export default function Footer() {
    return (
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8" >
            <div className="container mx-auto px-4">

                <div className="flex md:flex-row flex-col justify-center items-center md:justify-between">


   <span><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/privacy-policy">Privacy Policy</a></span>
                                    <span><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/contact-us">Conatct Us</a></span>
                                    <span><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/terms-of-service">Terms of Service</a></span>
                </div>
                
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Copyright © 2025 savefrominsta.app 
                        </div>
                    </div>
                </div>
            </div>
        </footer>    );
}
