import Image from "next/image";
import { urlFor } from "../app/lib/sanity";

// import ReaderImage from "../../public/reader.jpg";
import ProfileImage from "../../public/profile.avif";

interface CardProps {
  CoverImage: string;
  Title: string;
  Description: string;
  Author:string;
 }

export default function Card({ CoverImage, Title, Description, Author }: CardProps) {
  console.log(CoverImage);
  console.log("CoverImage "+urlFor(CoverImage).width(300).url());
  return (
    <div>
      <div className="flex flex-col w-[280px] min-h-[400px] max-h-[450px] overflow-y-auto gap-3 card p-4 rounded-[20px] ">
        <img src={urlFor(CoverImage).width(300).height(250).url()} alt="" />
        {/* <Image src={urlFor(CoverImage).width(300).url()} alt="readr-image" className="rounded-[20px]"></Image> */}
        <span className="text-[20px] font-bold">
           {Title}
        </span>
        <span className="text-[14px]">
       {Description}
          
        </span>

        <div className="flex items-center gap-4 ">
          <Image
            src={ProfileImage}
            alt="profile-image"
            width={20}
            height={20}
            className="rounded-full
"
          ></Image>
          <span className="text-[12px]">{Author}</span>
        </div>
      </div>
    </div>
  );
}
