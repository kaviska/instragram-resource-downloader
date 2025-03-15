import Image from "next/image";
import Head from "next/head";
import ProfileImage from "../../../../public/profile.avif";
import Nav from "@/components/Nav";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import FAQBlog from "@/components/FAQBlog";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getBlogBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug]{
    ...,
    "author": author->name,
    "authorImage": author->image,
    "image": mainImage.asset->url,
    "metaTitle": metaTitle,
    "metaDescription": metaDescription
  }`;
  const queryParams = { slug };
  return await client.fetch(query, queryParams);
}


// Dynamic Metadata
export async function generateMetadata({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);
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
  console.log("paramter" + params);

  
  const blog = await getBlogBySlug(params.slug);
  console.log(blog);

  return (
    <div>
      <Head>
        <title>{blog[0].metaTitle || "Blog Post"}</title>
        <meta name="description" content={blog[0].metaDescription || "Blog post description"} />
      </Head>
      <div className="header-blog mx-2 rounded-[20px] mt-5">
        <Nav></Nav>
        <div className="flex flex-col align-start justify-end justify-items-end h-[90vh]">
          <div className="mb-10">
            <h1 className="text-white text-[40px] font-bold p-4 md:max-w-[50%]">
              {blog[0].title}
            </h1>
            <p className="text-white text-[18px] p-4 md:max-w-[50%]">
              {blog[0].titleDescription}
            </p>
            <div className="flex gap-3 mx-4 mt-2">
              {blog[0].tags &&
                blog[0].tags.map((tag: string, index: number) => (
                  <button
                    key={index}
                    className="border border-white px-2 py-2 rounded-[10px] text-white"
                  >
                    {tag}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-content mt-10 flex">
        <div className="md:w-[75%] w-[100%] px-12">
          <div className="">
            <img
              src={urlFor(blog[0].mainImage).url()}
              className="img-fluid rounded-top"
              alt=""
            />

            <div id="content" className="my-4 prose max-w-none">
              <PortableText value={blog[0].body} />
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
        <div className="md:w-[25%] md:block hidden w-[0%]">
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
            <h3 className="font-semibold my-3">Writter</h3>
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

          <div className="contributers mt-4">
            <h3 className="font-semibold my-3">Contributters</h3>
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
    </div>
  );
}