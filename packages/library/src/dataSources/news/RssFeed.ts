import axios from 'axios';
import { NewsItem, getNews, NewsReport } from '../../interfaces/news';
import { getTagValue } from '../../utils';
import { JSDOM } from 'jsdom';

interface RssFeedConfig {
  feeds: Array<RssFeedItem>
};

interface RssFeedItem {
  title: string,
  url: string
};

async function getRssFeed(rssFeed: string): Promise<Array<NewsItem>> {
  const rss = await axios.get(rssFeed);

  const dom = new JSDOM(rss.data, {
    contentType: 'text/xml'
  });
  const doc = dom.window.document;

  let items: Array<NewsItem> = new Array();

  doc.querySelectorAll('item').forEach((item) => {
    let description = new JSDOM(getTagValue(item, 'description', '')).window.document.body.textContent || '';
    let title = getTagValue(item, 'title', '');

    items.push({
      title: title.trim(),
      summary: description.trim()
    });
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