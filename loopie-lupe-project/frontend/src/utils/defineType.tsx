import { type Type, Keywords } from "./Types";

export function defineType(title: string): Type | null {
  const lowerCased = title.toLowerCase();

  for (const type of Object.keys(Keywords) as Type[]) {
    for (const keyword of Keywords[type]) {
      if (lowerCased.includes(keyword.toLowerCase())) {
        return type;
      }
    }
  }

  console.warn(`Unclassified type for title: ${title}`);
  return null;
}
