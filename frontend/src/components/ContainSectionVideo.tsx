import HowToCard from "./HowToCard";
import FAQ from "./FAQ";
export default function ContainSectionVideo() {
  return (
    <div>
      <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Videos with Save From Insta?
        </h1>
        <p className="mb-4">
          Downloading Instagram videos has never been easier! With Save From
          Insta, you’re just three steps away from saving your favorite videos:
        </p>

        <div className="flex    md:gap-9 gap-3">
          <div className="flex flex-col gap-8  ">
            <HowToCard
              title="1. Copy the Video Link"
              description=" Open Instagram, find the video you want to download, and click on the three-dot menu to copy the link.
'"
            />

            <HowToCard
              title="2. Paste the Link on Save From Insta & Download"
              description=" Paste the copied link into the video downloader box on our site and click “Download.”."
            />

            <HowToCard title="3. That’s all! Enjoy your video" description="" />
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
            SaveFromInsta - Instagram Video Downloader
          </h1>

          <div className="   flex">
            <p className="">
              Save From Insta’s Instagram video downloader is an efficient tool
              that lets you download Instagram videos in HD quickly and
              securely. Whether you want to save tutorial videos, travel clips,
              or inspiring content, SaveFromInsta enables high-quality downloads
              in MP4 format without watermark. No Sign up or Installation
              required. Copy the Instagram Video URL/Link and click on download.
            </p>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-12">
          Why Choose Save From Insta for Instagram Video Downloads?

          </h1>

          <div className="   flex ">
            <ul className=" space-y-6">
              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>No Login/No sign up</b> - Download Instagram videos without registration
                  .{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Fast & Free</b> - Free and unlimited downloads.{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>HD Video Downloads</b> – Get high-definition(HD) Instagram videos.
                  !{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>Compatible with All Devices</b> –  Works on any mobile, PC or Mac
                  .{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b> No Watermarks</b> –You get the exact video you see on Instagram.{" "}
                </span>
              </li>

              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b> Private & Secure</b> – We do not store any records.{" "}
                </span>
              </li>

            
            </ul>
          </div>
        </div>

      
       
      </div>

      <div className="mt-3">
        <FAQ
          faq={[
            {
              question: "Can I download Instagram videos in HD?",
              answer:
                "Yes, simply paste the Instagram video link into our tool, and you can download it in HD. ",
            },
            {
question: "Is it possible to download private Instagram videos?",
              answer:
                " No, only public Instagram videos can be downloaded.",
            },
            {
              question: "Where do my downloaded videos go?",
              answer:
                " On desktop, your videos will be in the “Downloads” folder. On mobile, they will save to your camera roll or gallery..",
            },
          
          ]}
        />
      </div>
    </div>
  );
}
