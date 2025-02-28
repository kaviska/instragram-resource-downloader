"use client";
import { useRef, useState } from 'react';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageUrl,setImageUrl] = useState<string | null>(null);

  const sendData = async () => {
    const data = inputRef.current ? inputRef.current.value : '';
    alert("Your Reel is Processing. Please wait for a moment.");

    let endpoint = '';
    if (data.includes('/reel/')) {
      endpoint = 'http://localhost:5000/api/reel/';
    } else {
      endpoint = 'http://localhost:5000/api/image/';
    }

    console.log(data);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });
    const resData = await res.json();
    console.log(resData);
    if(endpoint === 'http://localhost:5000/api/image/') setImageUrl(resData.message);
    if(endpoint === 'http://localhost:5000/api/reel/') setVideoUrl(resData.message);

    //setVideoUrl(resData.message); // Set the video URL
  };

  return (
    <div>
      <input ref={inputRef} className='mt-4 w-screen h-12 text-black' placeholder="Add Your Text" />
      <button className="bg-blue-500 px-3 py-4 rounded-[10px]" onClick={sendData}>Send</button>
      
      {videoUrl && (
        <div className="mt-4">
          <video controls width="600">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <a href={`http://localhost:5000/api/download-reel?url=${encodeURIComponent(videoUrl)}`} download="video.mp4" className="bg-green-500 px-3 py-4 rounded-[10px] mt-4 inline-block">Download Video</a>
        </div>
      )}
     {imageUrl && (
    <div className="mt-4">
        <a 
            href={`http://localhost:5000/api/download-image-single?url=${encodeURIComponent(imageUrl)}`} 
            download="video.mp4" 
            className="bg-green-500 px-3 py-4 rounded-[10px] mt-4 inline-block"
        >
            Download Video
        </a>
    </div>
)}

    </div>
  );
}