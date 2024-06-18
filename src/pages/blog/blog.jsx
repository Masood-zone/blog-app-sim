import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBlogs } from "../../api/api";
import moment from "moment";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { lookingEyes } from "../../assets";

function SingleBlog() {
  const { id } = useParams();
  const { data } = useQuery("singleBlog", getBlogs);
  const blog = data?.find((blog) => blog.id === id);
  console.log(blog);
  return (
    <section className="">
      <div className="py-3 px-5 text-center">
        {/* Blog Title */}
        <h1 className="font-bold text-4xl">{blog?.posts[0]?.title}</h1>
      </div>
      <div className="flex flex-col my-10 py-5 ">
        {/* Image */}
        <figure>
          <img src={blog?.posts[0]?.image} className="w-full h-full" />
        </figure>
        {/* content */}
        <div className="py-5 px-5 max-w-4xl mx-auto">
          {/* Author Details */}
          <div className="flex items-center justify-between max-sm:flex-col max-md:flex-col max-sm:items-start max-md:items-start">
            <div className="text-lg my-5 flex items-start justify-start">
              <div className="flex items-center gap-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-16">
                    <span className="text-3xl">D</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="">{blog?.authors?.name}</p>
                  <p className="text-sm">
                    {moment(blog?.posts[0]?.timestamp).format("LLL")}
                  </p>
                </div>
              </div>
            </div>
            {/* Social links */}
            <div className="max-md:w-full">
              <ul className="flex items-center gap-5 max-sm:w-full max-md:w-full max-sm:py-2">
                {blog?.authors?.social_links?.map((link) => (
                  <li className="">
                    <a className="link-hover" target="_blank" href={link.url}>
                      <img src={link.icon} alt={link.platform} className="" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Text */}
          <h2 className="font-bold text-3xl py-4">
            {blog?.posts[0]?.content?.heading1}
          </h2>
          <p className="text-xl tracking-wider leading-relaxed">
            {blog?.posts[0]?.content?.section1}
          </p>
          <h2 className="font-bold text-3xl py-6 capitalize">
            {blog?.posts[0]?.content?.heading2}
          </h2>
          <p className="text-xl tracking-wider leading-relaxed">
            {blog?.posts[0]?.content?.section2}
          </p>
          <div className="text-xl pt-9">
            <p>Thanks for reading,</p>
            <p>{blog?.authors?.name}</p>
          </div>
          <div className="mt-9">
            <div className="flex flex-col w-full lg:flex-row">
              <div className="grid flex-grow h-16 card bg-blue-500 text-white rounded-box place-items-center">
                <div className="flex items-center gap-2 link-hover cursor-pointer text-lg ">
                  <Facebook />
                  <a target="_blank" href="https://facebook.com/">
                    <p>Share on Facebook</p>
                  </a>
                </div>
              </div>
              <div className="divider lg:divider-horizontal text-lg">OR</div>
              <div className="grid flex-grow h-16 card bg-black text-white rounded-box place-items-center">
                <div className="flex items-center gap-2 link-hover cursor-pointer text-lg ">
                  <Twitter />
                  <p>
                    <a target="_blank" href="https://twitter.com/">
                      Share on Twitter
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20 border-t-2 border-t-black w-full relative">
        <div className="absolute -top-8 left-0 right-0">
          <img
            src={lookingEyes}
            alt="looking-eye-icon"
            className="w-20 mx-auto"
          />
        </div>
        <div>
          <h3 className="text-5xl font-bold text-center py-16">
            What to read next
          </h3>
        </div>
        <ReadMore />
      </div>
      <div className="my-16 w-full">
        <NewsLetterSignup />
      </div>
    </section>
  );
}

export default SingleBlog;

function ReadMore() {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery("blogs", getBlogs);
  const relatedArticles = data?.filter((blog) => blog.id !== id);
  if (isLoading) {
    return (
      <div>
        <h1 className="font-bold text-4xl text-left py-5">All Articles</h1>
        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-2 mx-auto max-sm:grid-cols-1">
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
    <div className="grid grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-2  max-sm:grid-cols-1 my-2 max-w-6xl mx-auto gap-5">
      {relatedArticles.map((blog) => (
        <div
          key={blog?.id}
          className="w-80 h-auto flex flex-col max-lg:mx-auto max-md:mx-auto max-sm:mx-auto max-sm:w-full max-sm:my-5"
        >
          <figure>
            <img src={blog?.posts[0]?.image} className="w-full" />
          </figure>
          <div className="">
            <p className="text-center max-sm:py-2">
              <a href={`/blog/${blog?.id}`} className="link-hover text-[22px]">
                {blog?.title}
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NewsLetterSignup() {
  return (
    <div className="border-t-[12px] border-t-black border-2 border-black w-[640px] max-md:w-full max-sm:w-full max-md:p-7 h-auto p-10 flex flex-col items-center justify-center mx-auto">
      {/* Text */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-center max-sm:text-2xl max-md:text-3xl">
          Sign up for the newsletter
        </h1>
        <p className="text-xl max-sm:base max-md:text-lg font-base font-sans text-center py-4">
          If you want relevant updates occasionally, sign up for the private
          newsletter. Your email is never shared.
        </p>
      </div>
      {/* Input */}
      <div className="mt-4">
        <label className="input input-bordered flex items-center border-black rounded-none w-full px-0">
          <input
            type="text"
            className="text-black grow w-72 px-4 max-sm:w-full max-md:w-full"
            placeholder="Enter your email..."
          />
          <button className="bg-black text-white uppercase text-center h-full ml-5 w-28">
            Sign up
          </button>
        </label>
      </div>
    </div>
  );
}
