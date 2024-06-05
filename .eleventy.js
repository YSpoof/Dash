module.exports = function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });

  eleventyConfig.markdownTemplateEngine = "njk";
  eleventyConfig.htmlTemplateEngine = "njk";
  eleventyConfig.dataTemplateEngine = "njk";

  eleventyConfig.setTemplateFormats = ["njk", "md", "html"];

  // assets copy
  let itemsToCopy = [
    "src/main.js",
    "src/sw.js",
    "src/cache.json",
    "src/base.webp",
    "src/favicon.svg",
    "src/CNAME",
  ];
  itemsToCopy.forEach((item) => eleventyConfig.addPassthroughCopy(item));
  // assets copy

  eleventyConfig.dir = {
    input: "src",
    includes: "_includes",
    output: "docs",
  };

  // Env Variables
  eleventyConfig.addGlobalData("env", process.env);
  // Env Variables
};
