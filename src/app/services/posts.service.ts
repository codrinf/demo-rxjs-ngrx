import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import {map, shareReplay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .pipe(
      map(x => x.map(y => Object.assign(y, {isRead: (Math.random() < 0.5)}))),
      shareReplay()
    )
  }
}
