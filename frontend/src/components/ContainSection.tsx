import HowToCard from "./HowToCard"
import FAQ from "./FAQ"
export default function ContainSection(){
    return(
        <div>
              <div className="container max-w-4xl px-6 py-10 mx-auto container-section">
        <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
          How to Download Instagram Content?
        </h2>

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
          <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-8">
            What is Save From Insta?
          </h2>

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

          <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl mb-5 mt-12">
            Why should you use Save From Insta?
          </h2>

          <div className="   flex ">
            <ul className=" space-y-6">
              <li>
                <span> ✔</span>
                <span>
                  {" "}
                  <b>No Login/No sign up</b> - No login or sign up required, Just past
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

        <h2 className="text-2xl font-semibold  text-gray-800 lg:text-3xl mb-5 mt-12">
          Features of Save From Insta 
        </h2>

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
              answer:
                "No, Unfortunately you can't download private instagram content. Only public Instagram content can be downloaded.",
            },
            {
              question: "Does this work on mobile?",
              answer:
                "Yes! Our tool is optimized for Android, iPhone, iPad, and desktop. You can access our website through any web browser.",
            },
            {
              question: "Where do my downloaded files go?",
              answer:
                "Downloaded media will be saved on your device, on desktop you can access them from the downloads section on the web browser, On mobile media saves to the camera roll or gallery.",
            },
            {
              question: "Can I download Instagram profile pictures?",
              answer:
                "Yes, You can use our Instagram Profile Picture saver feature to use .",
            },
          ]}
        />
      </div>
        </div>
    )
}