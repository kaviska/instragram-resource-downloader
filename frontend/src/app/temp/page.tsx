"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GetAppIcon from "@mui/icons-material/GetApp";
import FAQ from "@/components/FAQ";
import HowToCard from "@/components/HowToCard";
import Footer from "@/components/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CircularProgressWithLabelProps {
  value: number;
}

function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Temp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [fetchedId, setFetchedId] = useState<string | null>(null); // Prevent duplicate API calls
  const [isReel, setIsReel] = useState<boolean>(false);
  const [multipleImages, setMultipleImages] = useState<string[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleStreamDownload = async (videoUrl: string, filename: string) => {
    try {
      const response = await fetch(videoUrl);
      const contentLength = response.headers.get("Content-Length");
      const total = parseInt(contentLength || '0', 10);
      console.log(fetchedId)

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
    alert("Your Content is Processing. Please wait for a moment.");

    try {
      const parsedUrl = new URL(data);
      const parts = parsedUrl.pathname.split("/");
      const newId = parts[3];

      if (parts[2] !== "reel" && parts[2] !== "p") {
        alert("Invalid URL. Please enter a valid Instagram URL.");
        return;
      }
      setIsReel(parts[2] === "reel");
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
          "x-rapidapi-key": "3b718006b9msh2d5d11044458229p18a7aejsn27634b6c412a",
          "x-rapidapi-host": "instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("API Result:", result);

        

        if (isReel) {
          setThumbnail(result.image_versions2?.additional_candidates?.first_frame?.url || null);
          setVideoUrl(result.video_versions?.[0]?.url || null);
        } else {
             console.log("Its a post")
             if(result.carousel_media){
                for(let i=0; i<result.carousel_media.length; i++){
                    console.log("Carousel Media:", result.carousel_media[i].image_versions2.candidates[0].url);
                    setMultipleImages((prevImages) => [...(prevImages || []), result.carousel_media[i].image_versions2.candidates[0].url]);
                    
                }
             
             }
             else{
                console.log("Single Image:", result.image_versions2?.candidates[0]?.url);
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
      <div className="bg-[#DA08C9] flex flex-col justify-center items-center p-5">
        <h1 className="md:text-[32px] text-[28px] text-white text-center">
          Instagram Content Download
        </h1>
        <p className="text-[18px] text-center text-white mt-3">
          Download Any Content From Instagram
        </p>
        <div className="flex md:flex-row flex-col md:gap-3 gap-0">
          <input
            ref={inputRef}
            className="mt-4 md:w-[700px] w-[300px] h-12 px-3 py-2 rounded-[10px] text-black"
            placeholder="Paste Instagram URL here"
          />
          <button
            className="bg-blue-500 h-12 px-8 text-[22px] mt-4 flex items-center justify-center text-white py-2 rounded-[10px]"
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
            {thumbnail && (
              <Image src={thumbnail} alt="Thumbnail" width={400} height={400} className="w-96 h-96 object-cover" />
            )}
            <button
              onClick={() => handleStreamDownload(videoUrl, "video.mp4")}
              className="bg-blue-500 px-3 text-white py-4 rounded-[10px] my-4"
            >
             <span className="mr-3">Download Video</span>
            <CircularProgressWithLabel value={downloadProgress} />

            </button>
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
                    <button
                      onClick={() => handleStreamDownload(image, "picture.jpg")}
                      className="bg-blue-500 text-white px-3 py-4 rounded-[10px] mt-4 inline-block"
                    >
                      Download Image
                    </button>
                  </div>
                ))}
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
                        <button
                       onClick={() => handleStreamDownload(imageUrl, "picture.jpg")}
                          className="bg-blue-500 text-white px-3 py-4 rounded-[10px] my-4 inline-block"
                        >
                          Download Image
                        </button>
                      </div>
                    </div>
                  )}

      <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl my-8">
        How to Download Instagram Content?
      </h1>

      <div className="flex md:flex-row flex-col justify-center items-center md:gap-9 gap-3">
        <HowToCard
          howtoProps={{
            title: "Copy the Instagram Link",
            description:
              'Open Instagram and copy the link of the reel, video, or post you want to download.',
          }}
        />
        <HowToCard
          howtoProps={{
            title: "Paste & Download",
            description: "Paste the link above and click Download.",
          }}
        />
        <HowToCard
          howtoProps={{
            title: "Enjoy Your Content",
            description: "Download and save your favorite content effortlessly.",
          }}
        />
      </div>

      <div className="mt-5">
        <FAQ
          faq={[
            {
              question: "How can I download Instagram reels in HD?",
              answer: "Copy the reel link, paste it into our tool, and hit Download.",
            },
            {
              question: "Can I download private Instagram stories?",
              answer: "No, you can only download public Instagram content.",
            },
            {
              question: "Does this work on mobile?",
              answer: "Yes, our tool is mobile-friendly and works on any device.",
            },
            {
              question: "Where do my downloaded files go?",
              answer: "Downloads are saved to your device’s default folder.",
            },
            {
              question: "Can I download Instagram profile pictures?",
              answer: "Yes, use our Profile Picture downloader feature.",
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}