import Card from "@/components/Card";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HowToCard from "@/components/HowToCard";

import { client } from "./lib/sanity";

type Blog = {
  _id: string;
  title: string;
  image: string;
  titleDescription: string;
  slug: string;
  author: string;
};

async function getBlogs() {
  const query = `*[_type == "blog"]{
    _id,
    title,
    "image": mainImage,
    "titleDescription": titleDescription,
    "slug": slug.current,
    "author": author->name
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const blogs=await getBlogs()

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl my-8">
          How to download Instagram carousel posts?
        </h1>
        <div className="flex md:flex-row flex-col md:gap-20 gap-3 align-middle items-center justify-center ">
          <HowToCard></HowToCard>
          <HowToCard></HowToCard>
          <HowToCard></HowToCard>
        </div>
      </div>

      <div>
        <FAQ></FAQ>
      </div>
      <h1 className="text-2xl  font-semibold text-center text-gray-800 lg:text-3xl my-8">
        Recent Blog
      </h1>
      <div className="flex md:flex-row flex-col md:gap-20 gap-3 align-middle items-center justify-center ">
        {blogs.slice(0, 3).map((blog: Blog) => (
          <a href={`/blog/${blog.slug}`} key={blog._id}>
            <Card
              CoverImage={blog.image}
              Title={blog.title}
              Description={blog.titleDescription}
              Author={blog.author}
            />
          </a>
        ))}
      </div>
      <Footer />
    </div>
  );
}
