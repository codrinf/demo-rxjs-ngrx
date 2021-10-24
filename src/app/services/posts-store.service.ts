import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../models/models';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsStoreService {

  private _posts = new BehaviorSubject<Post[]>([]);




  posts$: Observable<Post[]> = this._posts.asObservable();


  constructor(
    protected postsService: PostsService
  ) {
    this.loadPosts();
  }


  loadPosts() {
    const posts$ = this.postsService.loadPosts().pipe(
      tap(posts => this._posts.next(posts.map(x => {
        return <Post>{
          postId: x.id,
          userId: x.userId,
          title: x.title,
          body: x.body,
          isRead: (Math.random() < 0.5),
          commentsCount: 3, // todo: get count
          user: {
            name: 'Ion',
            username: 'Ion',
            website: 'Ion.com'
          }
        }
      })))
    ).subscribe();
  }



}
