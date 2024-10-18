// path: src/api/article/content-types/article/lifecycles.js

const { slugify } = require("transliteration");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    console.log(data);
    if (data.name) {
      // Transliterate the Bangla category name and generate a slug
      const slug = slugify(data.name, {
        lowercase: true,
        separator: "-",
      });

      data.slug = slug;
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.name) {
      // Transliterate the Bangla category name and generate a slug
      const slug = slugify(data.name, {
        lowercase: true,
        separator: "-",
      });

      data.slug = slug;
    }
  },
};
