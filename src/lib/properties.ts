import { getCollection, type CollectionEntry } from "astro:content";

type Property = CollectionEntry<"properties">;
type OpenHouse = CollectionEntry<"openHouses">;

export const formatEuro = (value: number) => `€${value.toLocaleString("en-US")}`;

export const propertyUrl = (property: Property) =>
  `/properties/${property.data.status}/${property.id}`;

export const priceText = (property: Property) => {
  const { isPriceOnRequest, priceLabel, price } = property.data;
  if (isPriceOnRequest) return "Price on request";
  if (price) return formatEuro(price);
  return priceLabel ?? "Price on request";
};

export const pricePerSqm = (property: Property) => {
  const { isPriceOnRequest, price, areaSqm } = property.data;
  if (isPriceOnRequest || !price || !areaSqm) return null;
  return Math.round(price / areaSqm);
};

export const formatViewingDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

export async function getNextViewings() {
  const now = new Date();
  const upcoming = (await getCollection("openHouses"))
    .filter((house) => new Date(house.data.date) >= now)
    .sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());
  const viewings = new Map<string, OpenHouse>();
  for (const house of upcoming) {
    if (!viewings.has(house.data.property)) viewings.set(house.data.property, house);
  }
  return viewings;
}

export const isActive = (property: Property) =>
  property.data.status === "for-sale" || property.data.status === "for-rent";

export async function getRecentSales() {
  const stories = await getCollection("stories");
  return (await getCollection("properties"))
    .filter((property) => property.data.status === "sold" && property.data.price)
    .flatMap((property) => {
      const story = stories.find((entry) => entry.data.property === property.id);
      if (!story) return [];
      const asking = property.data.price as number;
      const final = story.data.salePrice;
      return [
        {
          property,
          asking,
          final,
          difference: Math.round(((final - asking) / asking) * 1000) / 10,
          daysOnMarket: story.data.daysOnMarket,
          date: story.data.pubDate,
        },
      ];
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
