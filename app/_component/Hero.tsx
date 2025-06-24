import React from "react";

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:place-content-center">
      <div className="flex items-baseline pt-30 justify-center">
        <h1 className="text-black dark:text-white border border-black dark:border-white rounded-full px-4 ">
          See What's New |{" "}
          <span className="text-sky-400 font-semibold">AI Diagram</span>
        </h1>
      </div>
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-30">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Understand user flow and
            <strong className="text-sky-400"> increase </strong>
            conversions
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
            nisi. Natus, provident accusamus impedit minima harum corporis
            iusto.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-sky-400 bg-sky-400 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-sky-700"
              href="#"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
