import HowToCard from "./HowToCard";
import FAQ from "./FAQ";

export default function ContainSectionReel() {
  return (
    <div>
      <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Reels with Save From Insta?
        </h1>

        <div className="flex md:gap-9 gap-3">
          <div className="flex flex-col gap-8">
            <HowToCard
              title="1. Copy the Reel Link"
              description="Open Instagram, find the reel you want to download, and copy its link by tapping on the three-dot menu."
            />

            <HowToCard
              title="2. Paste the Link & Download"
              description="Paste the link into our reel downloader and click the “Download” button."
            />

            <HowToCard
              title="3. No Step 3! Enjoy your Instagram reel."
              description=""
            />
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
            Why Use SaveFromInsta for Instagram Reel Download?
          </h1>

          <div className="flex">
            <p>
              <b>Save From Insta</b> is a top-rated and trusted Instagram reels downloader that allows you to download reels in HD without any watermarks. You can easily download your favorite Instagram reels to watch offline or share with friends - without signing up or installing any app.
            </p>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-12">
            The Best Instagram Reel Downloader
          </h1>

          <div className="flex">
            <ul className="space-y-6">
              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Fast & Free Reels Downloads</b> – Download Instagram reels without logging in.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>No Watermarks</b> – Save reels exactly as they appear on Instagram.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>HD Quality</b> – Get Instagram reels in high-definition (HD) MP4 format.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Device Compatibility</b> – Works on Android, iPhone, Windows, and Mac.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Safe & Secure</b> – We don’t store any personal data.
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
              question: "How can I download Instagram reels in HD?",
              answer: "Copy the reel’s link, paste it into our Instagram reels downloader, and download it in HD.",
            },
            {
              question: "Can I download private reels?",
              answer: "No, Save From Insta can only download public reels.",
            },
            {
              question: "Where do my downloaded reels go?",
              answer: "On the desktop, reels will be saved in the “Downloads” folder (or location you select when downloading the reel). On mobile, they’ll save to File manager, your gallery or camera roll.",
            },
          ]}
        />
      </div>
    </div>
  );
}