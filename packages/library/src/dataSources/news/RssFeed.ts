import axios from 'axios';
import { NewsItem, getNews, NewsReport } from '../../interfaces/news';
import * as parser from 'fast-xml-parser';
import striptags from 'striptags';

interface RssFeedConfig {
  feeds: Array<RssFeedItem>
};

interface RssFeedItem {
  title: string,
  url: string
};

async function getRssFeed(rssFeed: string): Promise<Array<NewsItem>> {
  const rss = await axios.get(rssFeed);

  const p = parser.parse(rss.data);

  let items: Array<NewsItem> = p.rss.channel.item.map((item: any): NewsItem => {
    return {
      title: item.title,
      summary: striptags(item.description).trim()
    };
  });

  return items;

}


const rssNews: getNews = (options: RssFeedConfig) => {

  let newsReports: Array<NewsReport> = new Array();

  let rssTasks = [];

  return new Promise<Array<NewsReport>>(async (resolve, reject) => {

    const rssTasks = options.feeds.map((feed) => {
      const promise = new Promise<NewsReport>(async (resolve, reject) => {
        const newsItems = await getRssFeed(feed.url);

        resolve({
          newsItems,
          title: feed.title
        });
      });

      return promise;
    });

    Promise.all(rssTasks)
    .then((taskResults) => {
      resolve(taskResults);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export default rssNews;

