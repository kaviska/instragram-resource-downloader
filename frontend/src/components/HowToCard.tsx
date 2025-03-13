import Image from "next/image";
import ReaderImage from "../../public/reader.jpg";
import ProfileImage from "../../public/profile.avif";


export default function HowToCard() {
    return (
         <div>
              <div className="flex flex-col w-[280px] gap-3 card p-4 rounded-[20px]">
                <Image src={ReaderImage} alt="readr-image" className="rounded-[20px]"></Image>
                <span className="text-[20px] font-bold">
                  Interview With Economics and UI UX Engeinerr
                </span>
                <span className="text-[14px]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
                  rerum corrupti sequi molestiae
                  
                </span>
        
                
              </div>
            </div>

    )

}