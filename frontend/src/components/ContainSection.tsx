import { useEffect, useState } from "react";
import { client } from "../app/lib/sanity"; // Import the Sanity client
// Removed unused import
// Removed unused import
// Removed unused import
import { PortableText } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
// Removed unused import

export default function ContainSection() {
  interface Step {
    title: string;
    description: string;
  }

  interface Data {
    body: unknown;
    visibility: {
      showHowToDownload: boolean;
      showSaveFromInsta: boolean;
      showFeatures: boolean;
      showFAQ: boolean;
      showWhyShouldUse: boolean;
    };
    howToDownloadHeader: string;
    howToDownloadSteps: Step[];
    saveFromInstaHeader: string;
    saveFromInstaContent: string;
    featuresHeader: string;
    features: Step[];
    faq: { question: string; answer: string }[];
    whyShouldUse: { title: string; description: string }[];
  }

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    async function fetchData() {
      const query = `*[_type == "containSection"][0]`;
      const result = await client.fetch(query);
      console.log(result);
      setData(result);
    }
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center ">
        <div>
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-center mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );

  // Add default values for visibility
  const {
    // Removed unused destructured variables
  } = data;

  return (
    <div className="container max-w-4xl md:px-0 px-6 mx-auto">
      <div className="prose max-w-none">
      <PortableText value={data.body as TypedObject | TypedObject[]} />
      </div>
    </div>

    
    
  );
}
