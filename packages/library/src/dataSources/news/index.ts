import { default as RssFeed } from './RssFeed';
import { getNews } from '../../interfaces/news';
export { default as RssFeed } from './RssFeed';

export const newsPlugins: { [key: string]: getNews } = {
  RssFeed
};