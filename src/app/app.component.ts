import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './models/models';
import { PostsStoreService } from './services/posts-store.service';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readPosts$: Observable<Post[]>;
  notReadPosts$: Observable<Post[]>;

  constructor(private storeService: PostsStoreService) { }

  ngOnInit() {
    this.updatePosts();
  }

  onPostsChanged(post: Post) {
    console.log('Posts changed! ', post);
    this.updatePosts();
  }

  updatePosts() {
    const allPosts$ = this.storeService.posts$;
    this.readPosts$ = allPosts$.pipe(
      map(posts => posts.filter(x => x.isRead))
    );
    this.notReadPosts$ = allPosts$.pipe(
      map(posts => posts.filter(x => !x.isRead))
    );
  }
}
