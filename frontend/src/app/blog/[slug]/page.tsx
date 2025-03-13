import Image from "next/image";
import ProfileImage from "../../../../public/profile.avif";
import Nav from "@/components/Nav";
import { client } from "../../lib/sanity";
import { urlFor } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";

async function getBlogBySlug(slug) {
  const query = `*[_type == "blog" && slug.current == $slug]{
    ...,
    "author": author->name,
    "authorImage": author->image,
    "image": mainImage.asset->url
  }`;
  return await client.fetch(query, { slug });
}

export default async function Page({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog || blog.length === 0) {
    return <div>Blog post not found</div>;
  }

  const post = blog[0];

  return (
    <div>
      <div className="header-blog mx-2 rounded-[20px] mt-5">
        <Nav />
        <div className="flex flex-col align-start justify-end h-[90vh]">
          <div className="mb-10">
            <h1 className="text-white text-[40px] font-bold p-4 md:max-w-[50%]">{post.title}</h1>
            <p className="text-white text-[18px] p-4 md:max-w-[50%]">{post.titleDescription}</p>
            <div className="flex gap-3 mx-4 mt-2">
              {post.tags?.map((tag: string, index: number) => (
                <button key={index} className="border border-white px-2 py-2 rounded-[10px] text-white">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-content mt-10 flex">
        <div className="md:w-[75%] w-[100%] px-12">
          <img src={urlFor(post.mainImage).url()} className="img-fluid rounded-top" alt="Blog Cover" />
          <div className="my-4 prose max-w-none">
            <PortableText value={post.body} />
          </div>
          <div className="flex items-center gap-4">
            <Image src={urlFor(post.authorImage).url()} alt="author-image" width={40} height={40} className="rounded-full" />
            <span>{post.author}</span>
          </div>
        </div>

        <div className="md:w-[25%] hidden md:block">
          <div className="flex flex-col gap-2 font-medium cursor-pointer">
            {post.catalog?.map((item, index) => (
              <span key={index} className="font-bold">{item}</span>
            ))}
          </div>
          <hr className="my-3" />

          <div className="user-info mt-4">
            <h3 className="font-semibold my-3">Writer</h3>
            <div className="flex items-center gap-4">
              <Image src={urlFor(post.authorImage).url()} alt="author-image" width={40} height={40} className="rounded-full" />
              <span>{post.author}</span>
            </div>
            <hr className="my-3" />
          </div>

          <div className="contributers mt-4">
            <h3 className="font-semibold my-3">Contributors</h3>
            {[...Array(2)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <Image src={ProfileImage} alt="profile-image" width={40} height={40} className="rounded-full" />
                <span>Kaviska Dilshan</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
