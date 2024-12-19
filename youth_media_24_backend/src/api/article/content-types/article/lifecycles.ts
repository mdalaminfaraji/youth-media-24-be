import { slugify } from "transliteration";

interface EventParams {
  params: {
    data: {
      title?: string;
      slug?: string;
      banglaSlug?: string;
    };
  };
}

const slugGenerationHooks = {
  async beforeCreate(event: EventParams): Promise<void> {
    const { data } = event.params;

    if (data.title) {
      // Generate English Slug
      if (!data.slug) {
        data.slug = slugify(data.title, { lowercase: true, separator: "-" });
      }

      // Generate Bangla Slug
      if (!data.banglaSlug) {
        data.banglaSlug = data.title
          .replace(/\s+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    }
  },

  async beforeUpdate(event: EventParams): Promise<void> {
    const { data } = event.params;

    if (data.title) {
      if (!data.slug) {
        data.slug = slugify(data.title, { lowercase: true, separator: "-" });
      }

      if (!data.banglaSlug) {
        data.banglaSlug = data.title
          .replace(/\s+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    }
  },
};

export default slugGenerationHooks;
