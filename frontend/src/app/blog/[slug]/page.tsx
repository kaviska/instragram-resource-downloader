import Image from "next/image";
import ProfileImage from "../../../../public/profile.avif";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import FAQBlog from "@/components/FAQBlog";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

async function getBlogBySlug(slug: string[]) {
  const query = `*[_type == "blog" && slug.current == $slug]{
    ...,
    "author": author->name,
    "authorImage": author->image,
    "image": mainImage.asset->url,
    "metaTitle": metaTitle,
    "metaDescription": metaDescription,
    "sidebar": sidebar
  }`;
  const queryParams = { slug };
  return await client.fetch(query, queryParams);
}

// Dynamic Metadata
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  if (!blog || blog.length === 0) {
    return {
      title: "Blog Post",
      description: "Blog post description",
    };
  }

  return {
    title: blog[0].metaTitle || "Blog Post",
    description: blog[0].metaDescription || "Blog post description",
    openGraph: {
      title: blog[0].metaTitle || "Blog Post",
      description: blog[0].metaDescription || "Blog post description",
      images: [
        {
          url: blog[0].image,
          width: 1200,
          height: 630,
          alt: blog[0].metaTitle || "Blog Post",
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  const isSidebarAvailable = blog[0].sidebar !== false;

  return (
    <div>
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-black text-[40px] font-bold md:max-w-[50%]">
          {blog[0].title}
        </h1>
      </div>

      <div className="page-content mt-5 flex container mx-auto max-w-6xl  md:px-0 px-12">
        <div className={isSidebarAvailable ? "md:w-[75%] w-[100%]" : "w-[100%]"}>
          <div>
            <img
              src={urlFor(blog[0].mainImage).url()}
              className="w-full object-cover rounded-top"
              alt=""
            />

            <div id="content" className="my-4 prose max-w-none">
              <PortableText
                value={blog[0].body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <img
                        src={urlFor(value.asset).url()}
                        alt={value.alt || "Blog Image"}
                        className="w-full max-h-[500px] object-cover rounded"
                      />
                    ),
                  },
                }}
              />
            </div>
            <div className="faq mt-4">
              {blog[0].faq && <FAQBlog faq={blog[0].faq}></FAQBlog>}
            </div>

            <div className="flex items-center gap-4">
              <Image
                src={urlFor(blog[0].authorImage).url()}
                alt="author-image"
                width={40}
                height={40}
                className="rounded-full"
              ></Image>
              <span>{blog[0].author}</span>
            </div>
          </div>
        </div>

        {isSidebarAvailable && (
          <div className="md:w-[25%] sidebar md:flex justify-end hidden w-[0%]">
            <div>
              <div className="flex flex-col gap-2 font-medium cursor-pointer">
                {blog[0].catalog &&
                  blog[0].catalog.map((item: string, index: number) => (
                    <span key={index} className="font-bold">
                      {item}
                    </span>
                  ))}
              </div>
              <hr className="my-3" />

              <div className="user-info mt-4">
                <h3 className="font-semibold my-3">Writer</h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={urlFor(blog[0].authorImage).url()}
                    alt="author-image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  ></Image>
                  <span>{blog[0].author}</span>
                </div>
                <hr className="my-3" />
              </div>

              <div className="contributors mt-4">
                <h3 className="font-semibold my-3">Contributors</h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={ProfileImage}
                    alt="profile-image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  ></Image>
                  <span>Kaviska Dilshan</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Image
                    src={ProfileImage}
                    alt="profile-image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  ></Image>
                  <span>Kaviska Dilshan</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}