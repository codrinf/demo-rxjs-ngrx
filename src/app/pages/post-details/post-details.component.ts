import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map, filter, tap, finalize } from 'rxjs/operators';
import { Comment, Post } from 'src/app/models/models';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: Post;
  comments: Comment[];

  @ViewChildren('comment') commentsRef: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    // Test combineLatest
    const postId = parseInt(this.route.snapshot.paramMap.get("postId"));

    const post$ = this.storeService.posts$.pipe(
      map(posts => posts.filter(x => x.postId === postId)[0])
    )

    const comments$ = this.storeService.loadCommentsForPost(postId);
    combineLatest([post$, comments$])
      .pipe(
        filter(x => !!x[0] && !!x[1]),
      )
      .subscribe(x => {
        this.post = x[0];
        this.comments = x[1];
        setTimeout(() => this.initListeners());
      })
  }

  initListeners() {
    this.commentsRef.forEach(commentElement => {
      const nativeElement = commentElement.nativeElement;
      // Test fromEvent (should select background)
      fromEvent(nativeElement, 'mouseup')
        .subscribe((ev: any) => {
          let selection = window.getSelection().toString();
          if (selection) {
            let innerHTML = nativeElement.innerHTML as string;
            innerHTML = innerHTML.replace(selection, `<span style="background-color: red;">${selection}</span>`);
            nativeElement.innerHTML = innerHTML;
          }
        })
    })
  }



}
