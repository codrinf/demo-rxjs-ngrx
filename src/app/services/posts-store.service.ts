import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap, mergeMap, concatMap, mergeAll, switchMap, map } from 'rxjs/operators';
import { Post, ServerPost, ServerUser } from '../models/models';
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
    const posts$ = this.postsService.loadPosts();
    const users$ = this.postsService.loadUsers();

    // Add User Info to Posts;
    const combined$ = users$.pipe(
      switchMap((users: ServerUser[]) => {
        return posts$.pipe(
          map((serverPosts: ServerPost[]) => {
            return serverPosts.map(serverPost => {
              const user = users.find(x => x.id === serverPost.userId);
              return <Post>{
                postId: serverPost.id,
                userId: serverPost.userId,
                title: serverPost.title,
                body: serverPost.body,
                isRead: (Math.random() < 0.5),
                commentsCount: 3, // todo: get count
                user: {
                  name: user.name,
                  username: user.username,
                  website: user.website
                }
              }
            })
          })
        )
      }) // todo: save to localhost
    ).subscribe(x => this._posts.next(x));
  }



}
