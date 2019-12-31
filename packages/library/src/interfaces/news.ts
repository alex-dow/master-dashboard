export interface NewsItem {
  title: string,
  summary: string
}

export interface NewsReport {
  title: string,
  newsItems: Array<NewsItem>
}

export type getNews = (options: any) => Promise<Array<NewsReport>>;
