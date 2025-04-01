import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex md:flex-row flex-col justify-center items-center md:justify-between">
                    <span>
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/privacy-policy">
                            Privacy Policy
                        </a>
                    </span>
                    <span>
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/contact-us">
                            Contact Us
                        </a>
                    </span>
                    <span>
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/terms-of-service">
                            Terms of Service
                        </a>
                    </span>
                    <span>
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/all-blog">
                           Blog
                        </a>
                    </span>
                </div>

                <div className="flex justify-center items-center mt-4 space-x-4">
                    <a href="https://www.tiktok.com/@savefromsocial" target="_blank" rel="noopener noreferrer" className="text-blueGray-600 hover:text-blueGray-800">
                       <Image alt='tiktok' width={20} height={20} src={'/tik-tok.png'}/>
                    </a>
                    <a href="https://www.instagram.com/savefromsocial/" target="_blank" rel="noopener noreferrer" className="text-blueGray-600 hover:text-blueGray-800">
                        <InstagramIcon style={{ fontSize: 20 }} />
                    </a>
                    <a href="https://www.youtube.com/@Savefromsocial" target="_blank" rel="noopener noreferrer" className="text-blueGray-600 hover:text-blueGray-800">
                        <YouTubeIcon style={{ fontSize: 20 }} />
                    </a>
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
        </footer>
    );
}
