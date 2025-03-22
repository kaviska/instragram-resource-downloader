"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GetAppIcon from "@mui/icons-material/GetApp";
import FAQ from "@/components/FAQ";
import HowToCard from "@/components/HowToCard";
import Footer from "@/components/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import TopHero from "@/components/TopHero";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

  const [downloadProgress, setDownloadProgress] = useState(0);

  const [copiedText, setCopiedText] = useState(""); // State to store copied text

  const handleCopy = () => {
    console.log("Copying text..." + copiedText);
    navigator.clipboard
      .readText()
      .then((text) => {
        setCopiedText(text); // Update state with copied text
        if (inputRef.current) {
          inputRef.current.value = text; // Set input field value
        }
      })
      .catch((err) => console.error("Failed to read clipboard:", err));
  };

  const handleStreamDownload = async (videoUrl: string, filename: string) => {
    try {
      const response = await fetch(videoUrl);
      const contentLength = response.headers.get("Content-Length");
      const total = parseInt(contentLength || "0", 10);
      console.log(fetchedId);
      console.log(downloadProgress);

      if (!response.body) {
        throw new Error("No body found in response");
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let downloadedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        downloadedBytes += value.length;

        // Update progress
        const progress = (downloadedBytes / total) * 100;
        setDownloadProgress(progress);
      }

      const blob = new Blob(chunks, { type: "video/mp4" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      downloadLink.click();
    } catch (error) {
      window.alert("Error downloading the video. Please try again later.");
      console.error("Error downloading the video:", error);
    }
  };

  const sendData = () => {
    const data = inputRef.current?.value.trim();
    if (!data) return;

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
      }
    };

    fetchData();
  }, [id, isReel]);

  return (
    <div>
      <div className="bg-[#DA08C9] flex flex-col justify-center items-center px-5 py-16 ">
        <TopHero />

        <h1 className="md:text-[32px] text-[28px] text-white  md:text-start text-center mt-8 ">
          Instagram Video Downloader
        </h1>

        <div className="flex md:flex-row flex-col md:gap-3 gap-5 mt-4">
          <div className=" flex items-center border mt-4 h-12 md:pr-1 pr-64 md:py-2  text-black bg-white rounded-[10px] overflow-hidden md:w-[700px] w-[300px]">
            <input
              ref={inputRef}
              className="outline-none flex-1 h-12 px-3 py-2"
              placeholder="Paste instagram link here"
            />

            <button
              className="bg-[#AEAEAE]  md:px-6 px-3 md:text-[18px] text-[15px]  flex gap-3 items-center justify-center text-white py-2 rounded-[10px]"
              onClick={handleCopy}
            >
              <ContentCopyIcon style={{ color: "white", fontSize: "18px" }} />
              <span>Paste</span>
            </button>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 h-12 px-6 text-[18px] mt-4 flex gap-3 items-center justify-center text-white py-2 rounded-[10px]"
            onClick={sendData}
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
              <Image
                src={thumbnail}
                alt="Thumbnail"
                width={400}
                height={400}
                className="w-96 h-96 object-cover"
                loading="lazy"
              />
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
              <Image
                src={image}
                alt="image"
                width={400}
                height={400}
                className="w-96 h-96 object-cover"
                loading="lazy"
              />
              <button
                onClick={() => handleStreamDownload(image, "picture.jpg")}
                className="bg-blue-500 text-white px-3 py-[10px] rounded-[10px] mt-4 inline-block"
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
            <Image
              src={imageUrl}
              alt="image"
              width={400}
              height={400}
              className="w-96 h-96 object-cover"
              loading="lazy"
            />
            <button
              onClick={() => handleStreamDownload(imageUrl, "picture.jpg")}
              className="bg-blue-500 text-white px-3 py-[10px] rounded-[10px] my-4 inline-block"
            >
              Download Image
            </button>
          </div>
        </div>
      )}

      <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Content?
        </h1>

        <div className="flex    md:gap-9 gap-3">
          <div className="flex flex-col gap-8  ">
            <HowToCard
              title="1. Copy the Instagram Link"
              description="Open Instagram app or website and find the video, reel, story, or post you want to download.Tap on the three-dot menu on the right-left corner and select 'Copy Link.'"
            />

            <HowToCard
              title="2. Paste the Link on Save From Insta & Download"
              description="Past the link on the above box and click download."
            />

            <HowToCard
              title="3. Just Kidding There’s no step 3. Enjoy your content :)"
              description="💡 Tip: You can easily paste the copied link by clicking on the ‘paste’ button."
            />
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-semibol text-gray-800 lg:text-3xl mb-5">
            What is Save From Insta?
          </h1>

          <div className="   flex">
            <p className="">
              <b>Save From Insta</b> is your go-to{" "}
              <b>Instagram video downloader</b> that allows you to{" "}
              <b>
                download Instagram reels, videos, photos, carousels, and stories
              </b>{" "}
              quickly and securely. Whether you want to{" "}
              <b>save Insta reels, download IG videos,</b> or{" "}
              <b>save Instagram stories with music</b> , our tool provides
              high-quality downloads with just one click. No sign up or
              installation needed. Just copy and paste the post link and
              download.
            </p>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-12">
            Why should you use Save From Insta?
          </h1>

          <div className="   flex ">
            <ul className=" space-y-6">
              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  No Login/No sign up: No login or sign up required, Just past
                  the instagram post or reel link and download the media to your
                  device.{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Fast & Free</b> - Unlimited downloads without login or
                  registration..{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>No Watermarks</b> – What you see is what you get!{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Works on Any Device</b> – Supports Mobile (Android, iPhone)
                  , PC (Windows, Mac) and tablets.{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Private & Secure</b> – We don’t store any user data.{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Less ads</b> - Very minimal ads for fast and seamless
                  service.{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <h1 className="text-2xl font-semibold  text-gray-800 lg:text-3xl mb-5 mt-12">
          Features of Save From Insta ?
        </h1>

        <div className="flex   md:gap-9 gap-3">
          <div className="flex flex-col gap-8 ">
            <HowToCard
              title="🔹 Online Instagram Video Downloader 
"
              description="Are you looking to download Instagram videos in HD? Save from Insta provides MP4 and high-resolution formats so you can download your favourite reels and videos.
'"
            />

            <HowToCard
              title="🔹 Save Instagram Stories & Highlights"
              description="If you are looking to save one of your instagram Stories or Instagram Highlights, Our Instagram story saver allows you to save any public story or highlight with just 2 clicks.
 
.
."
            />

            <HowToCard
              title="🔹 Online Instagram Reels Downloader in HD
"
              description="With our online Instagram Reels downloader you can now download or save your favourite IG reels 
"
            />

            <HowToCard
              title="🔹 Online Instagram Profile Picture Downloader"
              description="Want your Instagram Profile Photo on your device? Use our profile picture saver option and download your Instagram profile photo.."
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <FAQ
          faq={[
            {
              question: "How can I download Instagram reels in HD?",
              answer:
              "Simply copy the Instagram reel link, paste it into our Instagram reels downloader, and hit Download. ",
            },
            {
              question: "Can I download private Instagram stories?",
              answer: "No, Unfortunately you can't download private instagram content. Only public Instagram content can be downloaded.",
            },
            {
              question: "Does this work on mobile?",
              answer:
                "Yes! Our tool is optimized for Android, iPhone, iPad, and desktop. You can access our website through any web browser.",
            },
            {
              question: "Where do my downloaded files go?",
              answer: "Downloaded media will be saved on your device, on desktop you can access them from the downloads section on the web browser, On mobile media saves to the camera roll or gallery.",
            },
            {
              question: "Can I download Instagram profile pictures?",
              answer: "Yes, You can use our Instagram Profile Picture saver feature to use .",
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
