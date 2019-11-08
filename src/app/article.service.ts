import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  getArticles():Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:8080/api/v1/article');
  }

  deleteArticle(id):Observable<Article[]> {
    this.http.delete('http://localhost:8080/api/v1/article/' + id);
    return this.http.get<Article[]>('http://localhost:8080/api/v1/article');
  }

  
  

}
