import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/models';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readPosts$: Observable<Post[]> = this.storeService.posts$.pipe(
    map(posts => posts.filter(x => x.isRead))
  );
  notReadPosts$: Observable<Post[]> = this.storeService.posts$.pipe(
    map(posts => posts.filter(x => !x.isRead))
  );

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

}
