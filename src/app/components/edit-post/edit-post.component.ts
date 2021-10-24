import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  editForm: FormGroup;
  post: Post;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) post: Post,
    private postsService: PostsService
  ) {
    this.post = post;

    this.editForm = fb.group({
      title: [post.title, Validators.required],
      body: [post.body, Validators.required],
      isRead: [post.isRead, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    const changes = this.editForm.value;
    this.postsService.saveCourse(this.post.id, changes).subscribe((val) => this.dialogRef.close(val));
  }

  onCancel() {
    this.dialogRef.close();
  }

}
