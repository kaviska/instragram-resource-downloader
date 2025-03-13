import { Twitter, Facebook, SportsBasketball, GitHub } from "@mui/icons-material";

export default function Footer() {
    return (
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8" >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-3xl font-semibold text-blueGray-700">Let&apos;s keep in touch!</h4>
                        <h5 className="text-[17px] mt-0 mb-2 text-blueGray-600">
                            Find us on any of these platforms, we respond 1-2 business days.
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6 flex space-x-2">
                            <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none">
                                <Twitter />
                            </button>
                            <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none">
                                <Facebook />
                            </button>
                            <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none">
                                <SportsBasketball />
                            </button>
                            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none">
                                <GitHub />
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                                <ul className="list-unstyled">
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">About Us</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Blog</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Github</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Free Products</a></li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">MIT License</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Terms & Conditions</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Privacy Policy</a></li>
                                    <li><a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                            Copyright © {new Date().getFullYear()} Notus JS by
                            <a href="#" className="text-blueGray-500 hover:text-blueGray-800"> Creative Tim</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
