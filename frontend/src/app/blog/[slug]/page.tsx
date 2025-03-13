import Image from "next/image";
import ProfileImage from "../../../../public/profile.avif";
import Nav from "@/components/Nav";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps ) {
  console.log(params);

  async function getBlogBySlug(slug: string) {
    const query = `*[_type == "blog" && slug.current == $slug]{
    ...,
    "author": author->name,
    "authorImage": author->image,
    "image": mainImage.asset->url
  }`;
    const params = { slug };
    return await client.fetch(query, params);
  }

  const blog = await getBlogBySlug(params.slug);
  console.log(blog);

  return (
    <div>
      <div className="header-blog mx-2 rounded-[20px] mt-5">
        <Nav></Nav>
        <div className=" flex flex-col align-start justify-end justify-items-end h-[90vh]">
          <div className="mb-10">
            <h1 className="text-white text-[40px] font-bold p-4 md:max-w-[50%]">
              {blog[0].title}
            </h1>
            <p className="text-white text-[18px] p-4 md:max-w-[50%]">{blog[0].titleDescription}</p>
            <div className="flex gap-3 mx-4 mt-2 ">
                {blog[0].tags.map((tag: string, index: number) => (
                <button key={index} className="border border-white px-2 py-2 rounded-[10px] text-white">
                  {tag}
                </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-content mt-10  flex">
        <div className="md:w-[75%] w-[100%] px-12">
          <div className="">
            <img
              src={urlFor(blog[0].mainImage).url()}
              class="img-fluid  rounded-top"
              alt=""
            />

            <div id="content " className="my-4 prose max-w-none ">
              <PortableText value={blog[0].body}/>
          
            
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
          <div className=" flex flex-col gap-2 font-medium cursor-pointer">
            {blog[0].catalog.map((item: string, index: number) => (
              <span key={index} className="font-bold">
              {item}
              </span>
            ))}
          </div>
          <hr className="my-3" />

          <div className="user-info mt-4">
            <h3 className=" font-semibold my-3">Writter</h3>
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
            <h3 className=" font-semibold my-3">Contributters</h3>
            <div className="flex items-center gap-4">
              <Image
                src={ProfileImage}
                alt="profile-image"
                width={40}
                height={40}
                className="rounded-full
"
              ></Image>
              <span>Kaviska Dilshan</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Image
                src={ProfileImage}
                alt="profile-image"
                width={40}
                height={40}
                className="rounded-full
"
              ></Image>
              <span>Kaviska Dilshan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
