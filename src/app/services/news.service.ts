import {Injectable} from '@angular/core';

@Injectable()
export class NewService{
  news: string;

  getNews(): string{
    return this.news;
  }

  updateNews(newNews: string){
    this.news = newNews;
  }
}
