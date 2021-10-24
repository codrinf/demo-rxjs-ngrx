import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { Post } from 'src/app/models/models';
import { StoreService } from 'src/app/services/store.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  @Input() posts: Post[] = [];

  @Output() postsChanged: EventEmitter<Post> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  onEditPost(post: Post) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = post;

    const dialogRef = this.dialog.open(EditPostComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val), // do nothing if only close (as it sends null value)
        tap((val) => this.postsChanged.emit(val))
      )
      .subscribe();
  }

  onDeletePost(postId: number) {
    this.storeService.deletePost(postId)
  }

}
