import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Post, ServerComment, ServerPost, ServerUser } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  loadPosts(): Observable<ServerPost[]> {
    return this.httpClient.get<ServerPost[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        shareReplay()
      );
  }

  loadUsers(): Observable<ServerUser[]> {
    return this.httpClient.get<ServerUser[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        shareReplay()
      );
  }

  loadComments(): Observable<ServerComment[]> {
    return this.httpClient.get<ServerComment[]>('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        shareReplay()
      );
  }

  saveCourse(postId: number, changes: Partial<Post>) {
    return this.httpClient.put<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
