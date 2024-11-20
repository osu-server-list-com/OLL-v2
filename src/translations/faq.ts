import { translations as content } from './faq/content';

export type Translation = {
  [key: string]: {
    title: string;
    sections: {
      title: string;
      content: React.ReactNode;
    }[];
  }
};

export const translations: Translation = content;