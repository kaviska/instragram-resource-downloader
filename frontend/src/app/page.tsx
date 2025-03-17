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
      //endpoint = "http://localhost:5000/api/reel/";
      endpoint = "https://api.savefrominsta.app//api/reel/";
    } else {
      //endpoint = "http://localhost:5000/api/image/";
      endpoint = "https://api.savefrominsta.app//api/image/";
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
    if (endpoint === "https://api.savefrominsta.app//api/image/") {
      //check res.data is a array
      if (Array.isArray(resData.message)) {
        setMultipleImages(resData.message);
        return;
      }
      setImageUrl(resData.message);
    }
    if (endpoint === "https://api.savefrominsta.app//api/reel/")
      setVideoUrl(resData.message);
    setThumbnail(resData.thumbnail);

    //setVideoUrl(resData.message); // Set the video URL
  };

  return (
    <div>
      <div className="bg-[#DA08C9] flex flex-col justify-center items-center p-5">
        <h1 className="md:text-[32px] text-[28px] text-white  md:text-start text-center">
          Instagram Content Download
        </h1>
        <p className="text-[18px] md:text-start text-center text-white mt-3">
          Download Any Content From Instragram
        </p>
        <div className="flex md:flex-row flex-col md:gap-3 gap-0">
          <input
            ref={inputRef}
            className="mt-4  md:w-[700px] w-[300px] h-12 px-3 py-2 rounded-[10px] text-black"
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

      <div className=" flex md:flex-row flex-col justify-center items-center md:gap-9 gap-3 ">
        <HowToCard
          howtoProps={{
            title: " Copy the Instagram Link",
            description:
              'Open Instagram app or website and find the video, reel, story, or post you want to download.Tap on the three-dot menu on the right-left corner and select "Copy Link.".',
          }}
        />

        <HowToCard
          howtoProps={{
            title: "Paste the Link on Save From Insta & Download",
            description:
              'Past the link on the above box and click download".',
          }}
        />

        <HowToCard
          howtoProps={{
            title: "Just Kidding There’s no step 3. Enjoy your content :)",
            description:
              '💡 Tip: You can easily paste the copied link by clicking on the ‘paste’ button.',
          }}
        />
      </div>
      <div className="mt-5">
        <FAQ
          faq={[
            {
              question: "How can I download Instagram reels in HD?",
              answer:
                "Simply copy the Instagram reel link, paste it into our Instagram reels downloader, and hit Download.",
            },
            {
              question: "Can I download private Instagram stories?",
              answer:
                "No, Unfortunately you can't download private instagram content. Only public Instagram content can be downloaded.",
            },
            {
              question: "Does Save From Insta work on mobile?",
              answer:
                "Yes! Our tool is optimized for Android, iPhone, iPad, and desktop. You can access our website through any web browse.",
            },
            {
              question:
                "Where do my downloaded Instagram videos, reels and images go?",
              answer:
                "Downloaded media will be saved on your device, on desktop you can access them from the downloads section on the web browser, On mobile media saves to the camera roll or gallery",
            },
            {
              question: "Can I download Instagram profile pictures?",
              answer:
                "Yes, You can use our Instagram Profile Picture saver feature to use.",
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
