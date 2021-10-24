import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Comment, Post } from 'src/app/models/models';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  all$: Observable<[Post, Comment[]]>;


  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService) { }

  ngOnInit(): void {
    const postId = parseInt(this.route.snapshot.paramMap.get("postId"));

    const post$ = this.storeService.posts$.pipe(
      map(posts => posts.filter(x => x.postId === postId)[0])
    )

    const comments$ = this.storeService.loadCommentsForPost(postId);
    this.all$ = combineLatest([post$, comments$])
      .pipe(
        filter(x => !!x[0] && !!x[1])
      );
  }

}
