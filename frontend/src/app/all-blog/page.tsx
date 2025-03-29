import Card from "@/components/Card";
import { client } from "../lib/sanity";

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
// async function getFeaturedBlog() {
//   const query = `*[_type == "blog" && featured == true]{
//     _id,
//     title,
//     "image": mainImage,
//     "titleDescription": titleDescription,
//     "slug": slug.current,
//     "author": author->name
//   }`;
//   const featuredBlogs = await client.fetch(query);
//   if (featuredBlogs.length > 0) {
//     return featuredBlogs[0];
//   } else {
//     const allBlogs = await getBlogs();
//     return allBlogs.length > 0 ? allBlogs[0] : null;
//   }
// }

type Blog = {
  _id: string;
  title: string;
  image: string;
  titleDescription: string;
  slug: string;
  author: string;
};

export default async function AllBlog() {
  const blogs = await getBlogs();
  // const featuredBlog = await getFeaturedBlog();

  console.log(blogs);

  return (
    <div className="container mx-auto max-w-6xl  md:px-0 px-12">
      <div className="mt-5 text-center">
        <h1 className="text-black text-[40px] font-bold">Blog</h1>
        <div className="mt-3">
          <input
        type="text"
        placeholder="Search blogs..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
          />
        </div>
      </div>
     
      <div className="mt-5 flex md:flex-row flex-col  flex-wrap justify-center items-center md:justify-start cursor-pointer gap-x-6 gap-y-3">
        {blogs.map((blog: Blog) => (
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
    </div>
  );
}
