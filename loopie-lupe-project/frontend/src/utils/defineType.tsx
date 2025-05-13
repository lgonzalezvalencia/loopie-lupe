import { Type, Keywords } from "./Types";

export function defineType(title: string): Type {
    const lowerCased = title.toLowerCase();

    for (const type of Object.keys(Keywords) as Type[]) {
        for (const keyword of Keywords[type]) {
            if(lowerCased.includes(keyword.toLowerCase())) {
                return type;
            }
        }
    }
    throw new Error(`Unclassified`);
}