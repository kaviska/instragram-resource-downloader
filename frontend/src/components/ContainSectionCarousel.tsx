import HowToCard from "./HowToCard";
import FAQ from "./FAQ";

export default function ContainSectionCarousel() {
  return (
    <div>
      <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Carousels with Save From Insta?
        </h1>

        <div className="flex md:gap-9 gap-3">
          <div className="flex flex-col gap-8">
            <HowToCard
              title="1. Copy the Carousel Link"
              description="Open Instagram, find the carousel post you want to download, and copy its link."
            />

            <HowToCard
              title="2. Paste the Link & Download"
              description="Paste the carousel link into our downloader and click “Download.”"
            />

            <HowToCard
              title="3. That’s it! Enjoy your carousel images or videos."
              description=""
            />
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
            Why Use Save From Insta for Instagram Carousels?
          </h1>

          <div className="flex">
            <p>
              <b>Save From Insta</b>’s Instagram carousel downloader allows you to download multi-image or video posts from Instagram with ease. Whether it’s a set of photos or a mix of images and videos, you can download everything in HD with just one click.
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
                  <b>Fast & Free Carousel Downloads</b> – Download Instagram carousels without logging in.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>No Watermarks</b> – Save carousels exactly as they appear.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>High-Quality Downloads</b> – Get HD photos and videos from carousels.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Compatible with All Devices</b> – Download on Android, iPhone, Windows, and Mac.
                </span>
              </li>

              <li>
                <span>✔</span>
                <span>
                  {" "}
                  <b>Private & Secure</b> – Your data is never stored.
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
              question: "How can I download all images from an Instagram carousel?",
              answer: "Copy the carousel post’s link, paste it into our tool, and download all images or videos in HD.",
            },
            {
              question: "Can I download private carousel posts?",
              answer: "No, Save From Insta only allows the download of public Instagram carousels.",
            },
            {
              question: "Where are my downloaded carousels saved?",
              answer: "On the desktop, they’ll be in your “Downloads” folder. On mobile, they’ll save to your gallery or camera roll.",
            },
          ]}
        />
      </div>
    </div>
  );
}