import Nav from "@/components/Nav";
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
async function getFeaturedBlog() {
  const query = `*[_type == "blog" && featured == true]{
    _id,
    title,
    "image": mainImage,
    "titleDescription": titleDescription,
    "slug": slug.current,
    "author": author->name
  }`;
  const featuredBlogs = await client.fetch(query);
  if (featuredBlogs.length > 0) {
    return featuredBlogs[0];
  } else {
    const allBlogs = await getBlogs();
    return allBlogs.length > 0 ? allBlogs[0] : null;
  }
}

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
  const featuredBlog = await getFeaturedBlog();

  console.log(blogs);

  return (
    <div>
      <div className="header-blog mx-2 rounded-[20px] mt-5">
        <Nav></Nav>
        <div className=" flex flex-col align-start justify-end justify-items-end h-[90vh]">
          <div className="mb-10">
            <h1 className="text-white text-[40px] font-bold p-4">
              {featuredBlog ? featuredBlog.title : "No Featured Blog"}
            </h1>
            <p className="text-white text-[16px] p-4">
              {featuredBlog
                ? featuredBlog.titleDescription
                : "No description available"}
            </p>
            <div className="flex gap-3 mx-4 mt-2 ">
              <a href={`/blog/${featuredBlog ? featuredBlog.slug : "#"}`}>
                <button className="border border-white px-2 py-2 rounded-[10px] text-white">
                  Featured
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex md:flex-row flex-col  flex-wrap justify-center items-center md:justify-start cursor-pointer gap-12 p-8">
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
