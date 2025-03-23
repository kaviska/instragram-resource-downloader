import HowToCard from "./HowToCard";
import FAQ from "./FAQ";

export default function ContainSectionPhoto() {
  return (
    <div>
      <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Photos with Save From Insta?
        </h2>

        <div className="flex md:gap-9 gap-3">
          <div className="flex flex-col gap-8">
            <HowToCard
              title="1. Copy the Photo Link"
              description="Open Instagram, find the photo you want to download, and copy its link from the three-dot menu."
            />

            <HowToCard
              title="2. Paste the Link & Download"
              description="Paste the copied link into our photo downloader and click “Download.”"
            />

            <HowToCard
              title="3. That’s all! Enjoy your photo."
              description=""
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
            Why Use SaveFromInsta to Download Instagram Photos?
          </h2>

          <div className="flex">
            <p>
              <b>Save From Insta</b>’s Instagram photo downloader lets you download high-quality photos from Instagram without logging in or signing up. You can now download Instagram photos or posts with just pasting the IG post’s URL on our tool. Our platform provides quick, easy, and high-quality downloads.
            </p>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-12">
            Why Choose Save From Insta?
          </h1>

          <div className="flex">
            <ul className="space-y-6">
              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Fast & Free Photo Downloads</b> – Unlimited downloads without signing up.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>No Watermarks</b> – Download Instagram photos exactly as they are.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>HD Quality</b> – Get high-resolution Instagram photos.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Works on All Devices</b> – Supports Android, iPhone, Windows, Mac, and more.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Private & Secure</b> – No data storage; your privacy is our priority.
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
              question: "Can I download Instagram photos in HD?",
              answer: "Yes, simply paste the Instagram photo link into our tool and download it in high definition.",
            },
            {
              question: "Can I download private Instagram photos?",
              answer: "No, only public Instagram photos can be downloaded.",
            },
            {
              question: "Where are my downloaded Instagram photos saved?",
              answer: "On the desktop, they’ll be in your “Downloads” folder. On mobile, they’ll save to your gallery or camera roll.",
            },
          ]}
        />
      </div>
    </div>
  );
}