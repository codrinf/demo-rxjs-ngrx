import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap, mergeMap, concatMap, mergeAll, switchMap, map } from 'rxjs/operators';
import { Post, ServerComment, ServerPost, ServerUser, User, Comment } from '../models/models';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _posts = new BehaviorSubject<Post[]>([]);
  private _users = new BehaviorSubject<User[]>([]);

  posts$: Observable<Post[]> = this._posts.asObservable();
  users$: Observable<User[]> = this._users.asObservable();


  constructor(
    protected serverService: ServerService
  ) {
    this.loadPosts();
  }

  public loadCommentsForPost(postId: number): Observable<Comment[]> {
    return this.serverService.loadComments().pipe(
      map((comments: ServerComment[]) => comments.filter(x => x.postId === postId)),
      map((comments: ServerComment[]) => comments.map(x => {
        return {
          postId: x.postId,
          commentId: x.id,
          name: x.name,
          body: x.body,
          email: x.email
        }
      }))
    )
  }

  public editPost(postId: number, changes: Partial<Post>) {
    return this.serverService.editPost(postId, changes)
      .pipe(
        tap((x: ServerPost) => {
          const posts = [...this._posts.value];
          const index = posts.findIndex(y => y.postId === x.id)
          posts[index].body = x.body;
          posts[index].title = x.title;
          posts[index].isRead = changes.isRead;
          posts[index].user = changes.user;

          this._posts.next(posts);
        })
      );
  }

  public deletePost(postId: number) {
    const posts = this._posts.value;
    const newPosts = posts.filter(x => x.postId !== postId)
    this._posts.next(newPosts);
  }


  protected loadPosts() {
    const posts$ = this.serverService.loadPosts();
    const users$ = this.serverService.loadUsers();

    // Add User Info to Posts;
    users$.pipe(
      tap((serverUsers: ServerUser[]) => {
        const users: User[] = serverUsers.map(x => {
          return {
            userId: x.id,
            name: x.name,
            username: x.username,
            address: x.address,
            phone: x.phone,
            website: x.website
          }
        })
        this._users.next(users);
      }),
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
                isRead: (serverPost.id < 50),
                user: {
                  userId: user.id,
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
