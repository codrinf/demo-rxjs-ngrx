import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readPosts$: Observable<Post[]>;
  notReadPosts$: Observable<Post[]>;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.updatePosts();
  }

  onPostsChanged(post: Post) {
    console.log('Posts changed! ', post);
    this.updatePosts();
  }

  updatePosts(){
    const allPosts$ = this.postsService.getPosts();
    this.readPosts$ = allPosts$.pipe(
      map(posts => posts.filter(x => x.isRead))
    );
    this.notReadPosts$ = allPosts$.pipe(
      map(posts => posts.filter(x => !x.isRead))
    );
  }
}
