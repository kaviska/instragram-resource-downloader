
import Image from "next/image";
import ProfileImage from "../../../../public/profile.avif";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import FAQBlog from "@/components/FAQBlog";
import Temp from "@/components/Temp";
import Catalog from "@/components/Catalog";

//comented out the import of client

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
  console.log(blog);
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
  const isDownloadAvailable = blog[0].download !== false;

  return (
    <div>
      {
        isDownloadAvailable && ( <Temp></Temp> )
      }
     
      <div className="container mx-auto max-w-6xl  md:px-0 px-12">
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
      block: {
        h2: ({ children, node }) => (
          <h2 id={node._key} className="scroll-mt-20">
            {children}
          </h2>
        ),
        normal: ({ children }) => <p>{children}</p>,
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
          <div className="md:w-[25%] sidebar pl-10  md:flex justify-end hidden w-[0%]">
            <div>
             <Catalog blog={blog}></Catalog>
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
              <h3 className="font-semibold mt-3">Published Date</h3>
              <p>{new Date(blog[0].publishedAt).toLocaleDateString()}</p>
                
               
               
              
              </div>
              <hr className="my-3" />
              <div className="categories mt-4">
                <h3 className="font-semibold mt-3">Categories</h3>
                {blog[0].categories && blog[0].categories.length > 0 ? (
                  <ul>
                    {blog[0].categories.map((category, index) => (
                      <li key={index}>{category}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No categories available</p>
                )}
              </div>

              <hr className="my-3" />
              <div className="tags mt-4">
                <h3 className="font-semibold mt-3">Tags</h3>
                {blog[0].tags && blog[0].tags.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {blog[0].tags.map((tag, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tags available</p>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}