"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GetAppIcon from "@mui/icons-material/GetApp";

import CircularProgress from "@mui/material/CircularProgress";
import TopHero from "@/components/TopHero";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ClearIcon from "@mui/icons-material/Clear";
import ContainSectionPhoto from "@/components/ContainSectionPhoto";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

export default function Temp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [fetchedId, setFetchedId] = useState<string | null>(null); // Prevent duplicate API calls
  const [isReel, setIsReel] = useState<boolean>(false);
  const [multipleImages, setMultipleImages] = useState<string[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pogress, setPogress] = useState<boolean>(false);

  

  const [copiedText, setCopiedText] = useState(""); // Store copied text
  const [isPasted, setIsPasted] = useState(false); // Track if something is pasted
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button disabled state

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setCopiedText(text);
        setIsPasted(true); // Change button to "Clear"
        if (inputRef.current) {
          inputRef.current.value = text;
        }
      })
      .catch((err) => console.error("Failed to read clipboard:", err));
  };

  const handleClear = () => {
    console.log(copiedText)
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setCopiedText("");
    setIsPasted(false); // Change button back to "Paste"
  };

  const dissableButton = () => {
    // Disable the button for 3 seconds
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  const handleStreamDownload = async (videoUrl: string, filename: string) => {
    try {
      console.log(fetchedId)

      const response = await fetch(`https://api.savefrominsta.app/api/download-reel?url=${encodeURIComponent(videoUrl)}`);
      if (!response.ok) {
      throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      downloadLink.click();
    } catch (error) {
      window.alert("Error downloading the Content. Please try again later.");
      console.error("Error downloading the video:", error);
    }
  };

  const sendData = () => {
    const data = inputRef.current?.value.trim();
    if (!data) return;

    //check url is valid or not url should have www.instagram.com
    if (!data.includes("www.instagram.com")) {
      alert("Invalid URL. Please enter a valid Instagram URL.");
      return;
    }

   

    setVideoUrl(null);
    setThumbnail(null);
    setFetchedId(null); // Reset fetchedId to allow new fetch request
    setMultipleImages(null);
    setImageUrl(null);
    setPogress(true);

    try {
      const parsedUrl = new URL(data);
      const parts = parsedUrl.pathname.split("/").filter(Boolean); // Remove empty strings
      for (let i = 0; i < parts.length; i++) {
        console.log("Parts:", parts[i]);
      }

      if (
        parts.length < 2 ||
        (parts[0] !== "p" &&
          parts[0] !== "reel" &&
          parts[1] !== "p" &&
          parts[1] !== "reel")
      ) {
        alert("Invalid URL. Please enter a valid Instagram URL.");
        return;
      }

      const newId =
        parts[0] === "p" || parts[0] === "reel" ? parts[1] : parts[2]; // Extract shortcode
      setIsReel(parts[0] === "reel" || parts[1] === "reel");
      setId(newId);
    } catch (error) {
      console.error("Invalid URL", error);
      alert("Invalid URL. Please enter a valid Instagram URL.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Prevent unnecessary API calls

      console.log("ID", id);
      console.log("Is Reel", isReel);

      const url = isReel
        ? `https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/reel_by_shortcode?shortcode=${id}`
        : `https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/post_by_shortcode?shortcode=${id}`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "3b718006b9msh2d5d11044458229p18a7aejsn27634b6c412a",
          "x-rapidapi-host":
            "instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("API Result:", result);
        setPogress(false);

        if (isReel) {
          setThumbnail(
            result.image_versions2?.additional_candidates?.first_frame?.url ||
              null
          );
          setVideoUrl(result.video_versions?.[0]?.url || null);
        } else {
          console.log("Its a post");
          if (result.carousel_media) {
            for (let i = 0; i < result.carousel_media.length; i++) {
              console.log(
                "Carousel Media:",
                result.carousel_media[i].image_versions2.candidates[0].url
              );
              setMultipleImages((prevImages) => [
                ...(prevImages || []),
                result.carousel_media[i].image_versions2.candidates[0].url,
              ]);
            }
          } else {
            console.log(
              "Single Image:",
              result.image_versions2?.candidates[0]?.url
            );
            setImageUrl(result.image_versions2?.candidates[0]?.url || null);
          }
        }

        setFetchedId(id); // Update fetchedId only after successful fetch
      } catch (error) {
        console.error("API Fetch Error:", error);
        alert("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [id, isReel]);

  return (
    <div>
      <div className="bg-[#DA08C9] flex flex-col justify-center items-center px-5 py-16 ">
        <TopHero />

        <h1 className="md:text-[32px] text-[28px] text-white  md:text-start text-center mt-8 ">
          Instagram Photo Downloader
        </h1>

        <div className="flex md:flex-row flex-col md:gap-3 gap-5 mt-4">
          <div className="flex items-center border mt-4 h-12 md:pr-1 pr-64 md:py-2 text-black bg-white rounded-[10px] overflow-hidden md:w-[700px] w-[340px]">
            <input
              ref={inputRef}
              className="outline-none flex-1 h-12 px-3 py-2"
              placeholder="Paste Instagram link here"
            />

            <button
              className="bg-[#AEAEAE] md:px-6 px-2 mx-0 md:text-[18px] text-[15px] flex gap-3 items-center justify-center text-white py-2 rounded-[10px]"
              onClick={isPasted ? handleClear : handlePaste} // Toggle function
            >
              {isPasted ? (
                <>
                  <ClearIcon style={{ color: "white", fontSize: "18px" }} />
                  <span>Clear</span>
                </>
              ) : (
                <>
                  <ContentPasteIcon
                    style={{ color: "white", fontSize: "18px" }}
                  />
                  <span>Paste</span>
                </>
              )}
            </button>
          </div>

          <button
            className={`h-12 px-6 text-[18px] mt-4 flex gap-3 items-center justify-center py-2 rounded-[10px] ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
            onClick={() => {
              sendData();
              dissableButton();
            }}
            disabled={isButtonDisabled} // Disable button based on state
          >
            <GetAppIcon style={{ color: "white", fontSize: "24px" }} />
            <span>Download</span>
            {pogress && <CircularProgress color="inherit" size={18} />}
          </button>
           
        </div>
       
      </div>

      {videoUrl && (
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center">
            {thumbnail && (
             <div className="relative">
             <Image
               src={thumbnail}
               alt="Thumbnail"
               width={400}
               height={500}
               className=" object-cover"
               loading="lazy"
             />
             <MovieCreationIcon
               style={{
                 color: "white",
                 fontSize: 24,
                 position: "absolute",
                 top: 10,
                 right: 10,
               }}
             />
           </div>
           
            )}
            {/* <button
              onClick={() => handleStreamDownload(videoUrl, "video.mp4")}
              className="bg-blue-500 px-3 text-white py-4 rounded-[10px] my-4"
            >
              <span className="mr-3">Download Video</span>
              <CircularProgressWithLabel value={downloadProgress} />
            </button> */}
            <a
              href={`https://api.savefrominsta.app/api/download-reel?url=${encodeURIComponent(
                videoUrl
              )}`}
              download="video.mp4"
              className="bg-blue-500 px-3 text-white py-[10px] rounded-[10px] my-4 justify-self-center inline-block"
            >
              Download Video
            </a>
          </div>
        </div>
      )}

      {multipleImages && (
        <div className="mt-12 flex gap-3 flex-wrap justify-center">
          {multipleImages.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
              <Image
                src={image}
                alt="image"
                width={400}
                height={500}
                className="w-96 h-96 object-cover"
                loading="lazy"
              />
               <ViewCarouselIcon
               style={{
                 color: "white",
                 fontSize: 24,
                 position: "absolute",
                 top: 10,
                 right: 10,
               }}
             />
              </div>
             
              <button
                onClick={() => {
                  handleStreamDownload(image, "picture.jpg");
                  dissableButton();
                }}
                className={`bg-blue-500 text-white px-3 py-[10px] rounded-[10px] mt-4 inline-block ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                disabled={isButtonDisabled}
              >
                Download Image
              </button>
            </div>
          ))}
          <hr />
        </div>
      )}

      {imageUrl && (
        <div className="mt-12 justify-center">
          <div className="flex flex-col items-center">
            <div className="relative">
            <Image
              src={imageUrl}
              alt="image"
              width={400}
              height={500}
              className="w-96 h-96 object-cover"
              loading="lazy"
            />
             <InsertPhotoIcon
               style={{
                 color: "white",
                 fontSize: 24,
                 position: "absolute",
                 top: 10,
                 right: 10,
               }}
             />

            </div>
           
            <button
              onClick={() => {
                handleStreamDownload(imageUrl, "picture.jpg");
                dissableButton();
              }}
              className={`bg-blue-500 text-white px-3 py-[10px] rounded-[10px] my-4 inline-block ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500"
              }`}
              disabled={isButtonDisabled}
            >
              Download Image
            </button>
          </div>
        </div>
      )}

      <ContainSectionPhoto/>

    

     
    </div>
  );
}
