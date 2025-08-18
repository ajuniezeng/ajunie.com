import { getCollection } from 'astro:content';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPosts(lang: string) {
  return (await getCollection('blog'))
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .filter((item) => item.data.langauge === lang);
}
