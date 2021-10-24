import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './models/models';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readPosts$: Observable<Post[]> = this.storeService.posts$.pipe(
    map(posts => posts.filter(x => x.isRead))
  );
  notReadPosts$: Observable<Post[]> = this.storeService.posts$.pipe(
    map(posts => posts.filter(x => !x.isRead))
  );

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    // this.updatePosts();
  }

}
