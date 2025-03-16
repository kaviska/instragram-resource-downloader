import Image from "next/image";
import ReaderImage from "../../public/reader.jpg";

interface HowToType{
  howtoProps: { title: string; description: string };
}

export default function HowToCard({howtoProps}:HowToType) {
    return (
         <div>
              <div className="flex flex-col w-[280px] h-[370px] gap-3 card p-4 rounded-[20px]">
                <Image src={ReaderImage} alt="readr-image" className="rounded-[20px]"></Image>
                <span className="text-[20px] font-bold">
                   {howtoProps.title}
                </span>
                <span className="text-[14px]">
                    {howtoProps.description}
                  
                </span>
        
                
              </div>
            </div>

    )

}