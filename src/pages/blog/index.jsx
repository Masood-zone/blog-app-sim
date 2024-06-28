import React from "react";
import { Link } from "react-router-dom";
import { BookMarked } from "lucide-react";
import blogApi from "../../reduxApp/api";

function Blogs() {
  const { data: blogs, error, isLoading } = blogApi.useGetBlogsQuery();
  return (
    <section className="max-w-4xl mx-auto">
      <FirstBlog data={blogs} isLoading={isLoading} error={error} />
      <AllBlogs data={blogs} isLoading={isLoading} error={error} />
    </section>
  );
}

export default Blogs;

function FirstBlog({ data, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="">
        <div className="h-[400px] w-full bg-gray-300 skeleton"></div>
        <div className="h-[50px] w-full bg-gray-300 skeleton my-5"></div>
        <div className="h-[50px] w-full bg-gray-300 skeleton my-5"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className=" w-full ">
        <p className="text-xl text-center">
          Error:{" "}
          <span className="text-red-600 font-medium">{error.message}</span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col my-10 py-5 ">
      <figure>
        <img src={data[0]?.posts[0]?.image} className="w-full h-full" />
      </figure>
      <div className="py-5 px-5 text-center">
        <h1 className="font-bold text-4xl max-md:text-left">
          <Link
            className="link-hover cursor-pointer"
            to={`/blog/${data[0].id}`}
          >
            {data[0]?.posts[0]?.title}
          </Link>
        </h1>
        <p className="text-lg my-5 flex items-center justify-center max-md:justify-start">
          <span>
            <BookMarked />
          </span>{" "}
          {data[0]?.authors?.name} - {data[0]?.authors?.bio}
        </p>
      </div>
      <div className="border-b-2 border-b-black w-[640px] max-md:w-full max-sm:w-full mx-auto"></div>
    </div>
  );
}

function AllBlogs({ data, isLoading, error }) {
  if (isLoading) {
    return (
      <div>
        <h1 className="font-bold text-4xl text-left py-5">All Articles</h1>
        <div className="grid grid-cols-2 mx-auto max-md:grid-cols-1 max-sm:grid-cols-1">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              className="h-[200px] w-80 m-5 bg-gray-300 skeleton"
            ></div>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className=" w-full ">
        <p className="text-xl text-center">
          Error:{" "}
          <span className="text-red-600 font-medium">{error.message}</span>
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-4xl text-center py-5">All Articles</h1>
      <div className="grid grid-cols-2 gap-5 w-full max-md:grid-cols-1 max-sm:grid-cols-1">
        {data.slice(1).map((blog) => (
          <div
            key={blog?.id}
            className="w-80 max-sm:w-full max-md:mx-auto h-auto flex flex-col m-5"
          >
            <figure>
              <img src={blog?.posts[0]?.image} className="w-full" />
            </figure>
            <div className="">
              <p className="text-center">
                <a
                  href={`/blog/${blog?.id}`}
                  className="link-hover text-[22px]"
                >
                  {blog?.title}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
