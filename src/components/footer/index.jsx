import React from "react";
import Marquee from "react-fast-marquee";

function Footer() {
  return (
    <footer className="footer footer-center bg-black text-white p-3">
      <aside>
        <Marquee
          speed={50}
          gradient={false}
          pauseOnHover={true}
          pauseOnClick={false}
          direction="left"
          style={{ color: "#fff", fontSize: "24px", height: "50px" }}
          className="hover:cursor-pointer"
        >
          <p className="p-2 uppercase font-bold font-sans">
            Digital product design
          </p>
          <p className="p-2 uppercase font-extralight font-sans">Remote work</p>
          <p className="p-2 uppercase font-extralight font-sans">UX design</p>
          <p className="p-2 uppercase font-bold font-sans">Distributed teams</p>
          <p className="p-2 uppercase font-extralight font-sans">
            Creativity Strategy
          </p>
          <p className="p-2 uppercase font-bold font-sans">Suspense Growth</p>
        </Marquee>
      </aside>
      <aside>
        <p className="font-bold text-5xl ">Blog app</p>
        <p className="w-[650px] max-md:w-full max-sm:w-full py-2 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu velit
          tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce
          a nunc eget ligula suscipit finibus.
        </p>
      </aside>
      <nav>
        <div className="">
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                className="link text-lg"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkednin.com"
                target="_blank"
                className="link text-lg"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://rss.com"
                target="_blank"
                className="link text-lg"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <aside>
        <p className="text-lg">
          Copyright © 2024 - All right reserved by Chippycode{" "}
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
