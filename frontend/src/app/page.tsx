"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import GetAppIcon from "@mui/icons-material/GetApp";
import FAQ from "@/components/FAQ";
import HowToCard from "@/components/HowToCard";
import Footer from "@/components/Footer";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [multipleImages, setMultipleImages] = useState<string[] | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);


  const sendData = async () => {
    const data = inputRef.current ? inputRef.current.value : "";
    let singleImage = true;
    setVideoUrl(null);
    setImageUrl(null);
    setMultipleImages(null);
    setThumbnail(null);

    //check input has img_index parameter or not
    if (data.includes("img_index")) {
      singleImage = false;
    }

    alert("Your Content is Processing. Please wait for a moment.");

    let endpoint = "";
    if (data.includes("/reel/")) {
      endpoint = "http://localhost:5000/api/reel/";
    } else {
      endpoint = "http://localhost:5000/api/image/";
    }

    console.log(data);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data, singleImage: singleImage }),
    });
    const resData = await res.json();
    console.log(resData);
    if (endpoint === "http://localhost:5000/api/image/") {
      //check res.data is a array
      if (Array.isArray(resData.message)) {
        setMultipleImages(resData.message);
        return;
      }
      setImageUrl(resData.message);
    }
    if (endpoint === "http://localhost:5000/api/reel/")
      setVideoUrl(resData.message);
      setThumbnail(resData.thumbnail);

    //setVideoUrl(resData.message); // Set the video URL
  };

  return (
    <div>
      <div className="bg-[#DA08C9] flex flex-col justify-center items-center p-5">
        <h1 className="text-[32px] text-white">Instagram Content Download</h1>
        <p className="text-[18px] text-white mt-3">
          Download Any Content From Instragram
        </p>
        <div className="flex gap-3">
          <input
            ref={inputRef}
            className="mt-4  w-[700px] h-12 px-3 py-2 rounded-[10px] text-black"
            placeholder="Add Your Text"
          />
          <button
            className="bg-blue-500 h-12 px-8 text-[22px] mt-4 gap-3 flex justify-center text-white py-2 rounded-[10px]"
            onClick={sendData}
          >
            <GetAppIcon style={{ color: "white", fontSize: "28px" }} />
            Send
          </button>
        </div>
      </div>

      {videoUrl && (
        <div className="mt-5 flex justify-center">
          <div className="flex flex-col items-center">  
           <Image
            src={thumbnail || ""}
            alt="image"
            width={400}
            height={400}
            className="w-96 h-96 object-cover"
           />

            <a
              href={`http://localhost:5000/api/download-reel?url=${encodeURIComponent(
                videoUrl
              )}`}
              download="video.mp4"
              className="bg-blue-500 px-3 text-white py-4 rounded-[10px] my-4 justify-self-center inline-block"
            >
              Download Video
            </a>
          </div>
        </div>
      )}
      {imageUrl && (
        <div className="mt-5 justify-center">
          <div className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt="image"
            width={400}
            height={400}
            className="w-96 h-96 object-cover"
          />
          <a
            href={`http://localhost:5000/api/download-image-single?url=${encodeURIComponent(
              imageUrl
            )}`}
            download="video.mp4"
            className="bg-blue-500 text-white px-3 py-4 rounded-[10px] my-4 inline-block"
          >
            Download Image
          </a>
          </div>
        
        </div>
      )}
      {multipleImages && (
        <div className="mt-5 flex gap-3 flex-wrap justify-center">
          {multipleImages.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={image}
                alt="image"
                width={400}
                height={400}
                className="w-96 h-96 object-cover"
              />
              <a
                href={`http://localhost:5000/api/download-image-single?url=${encodeURIComponent(
                  image
                )}`}
                download="video.mp4"
                className="bg-blue-500 text-white px-3 py-4 rounded-[10px] mt-4 inline-block"
              >
                Download Image
              </a>
            </div>
          ))}
        </div>
      )}
      <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl my-8 ">
        How to Download Instagram Photos, Carousels, Reels, Videos & Stories?{" "}
      </h1>

      <div className=" flex justify-center gap-9 ">
        <HowToCard />
        <HowToCard />
        <HowToCard />
      </div>
      <div className="mt-5">
        <FAQ
          faq={[
            {
              question: "How to download Instagram videos?",
              answer:
                "Simply paste the Instagram video URL in the input box and click on the Send button. The video will be processed and a download link will be provided.",
            },
            {
              question: "Can I download multiple images from a post?",
              answer:
                "Yes, if the post contains multiple images, they will be displayed and you can download each image individually.",
            },
            {
              question: "Is this service free?",
              answer: "Yes, this service is completely free to use.",
            },
            {
              question: "Do I need to install any software?",
              answer:
                "No, you do not need to install any software. This is a web-based service.",
            },
            {
              question: "Is it safe to use this downloader?",
              answer:
                "Yes, it is safe to use. We do not store any of your data.",
            },
          ]}
        />
      </div>
      <div className="mt-8">
        <Footer></Footer>
      </div>
    </div>
  );
}
