import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const properties = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/properties" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().optional(),
      status: z
        .enum(["for-sale", "for-rent", "sold", "off-market"])
        .default("for-sale"),
      propertyType: z
        .enum(["house", "apartment", "townhouse", "villa", "land", "other"])
        .default("house"),
      address: z.string(),
      city: z.string(),
      region: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      coordinates: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
      bedrooms: z.number().int().nonnegative().optional(),
      bathrooms: z.number().nonnegative().optional(),
      areaSqm: z.number().nonnegative().optional(),
      lotSqm: z.number().nonnegative().optional(),
      yearBuilt: z.number().int().optional(),
      price: z.number().nonnegative().optional(),
      priceLabel: z.string().optional(),
      isPriceOnRequest: z.boolean().default(false),
      coverImage: z.object({
        url: image(),
        alt: z.string(),
      }),
      gallery: z
        .array(
          z.object({
            url: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          })
        )
        .default([]),
      features: z
        .object({
          interior: z.array(z.string()).default([]),
          exterior: z.array(z.string()).default([]),
          community: z.array(z.string()).default([]),
          other: z.array(z.string()).default([]),
        })
        .default({
          interior: [],
          exterior: [],
          community: [],
          other: [],
        }),
      isFeatured: z.boolean().default(false),
      isStaffPick: z.boolean().default(false),
      energyClass: z.enum(["A", "B", "C", "D", "E", "F", "G"]).optional(),
      monthlyFee: z.number().nonnegative().optional(),
      priority: z.number().int().optional(),
      agent: z.string().optional(),
      neighborhood: z.string().optional(),
      pubDate: z.date().optional(),
    }),
});

const agents = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/agents" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      email: z.email().optional(),
      phone: z.string().optional(),
      licenseId: z.string().optional(),
      photo: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      bio: z.string().optional(),
      city: z.string(),
      languages: z.array(z.string()).default([]),
      isFeatured: z.boolean().default(false),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    category: z
      .enum(["buying", "selling", "renting", "investing", "other"])
      .default("other"),
    isFeatured: z.boolean().default(false),
    priority: z.number().int().optional(),
  }),
});

const neighborhoods = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/neighborhoods" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string().optional(),
      coverImage: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      summary: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      city: z.string(),
      commute: z.string(),
      schools: z.string(),
      avgPricePerSqm: z.number().nonnegative(),
    }),
});

const careers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/careers" }),
  schema: z.object({
    title: z.string(),
    department: z.string(),
    type: z.enum(["full-time", "part-time", "contract"]).default("full-time"),
    location: z.string().optional(),
    description: z.string(),
    requirements: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    pubDate: z.date().optional(),
  }),
});

const openHouses = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/openHouses" }),
  schema: z.object({
    title: z.string(),
    property: z.string(),
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    note: z.string().optional(),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      outcome: z.enum(["sold", "bought"]),
      property: z.string(),
      salePrice: z.number().nonnegative(),
      daysOnMarket: z.number().int().nonnegative(),
      quote: z.string(),
      photo: z.object({
        url: image(),
        alt: z.string(),
      }),
      featured: z.boolean().default(false),
      pubDate: z.date(),
    }),
});

export const collections = {
  legal,
  posts,
  resources,
  properties,
  agents,
  services,
  neighborhoods,
  careers,
  openHouses,
  stories,
};
