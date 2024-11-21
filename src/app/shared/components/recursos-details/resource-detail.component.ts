import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from '../../models/resource.model';
//import { Comment } from '../../models/comment-request.model';
import { ResourceService } from './../../../core/services/resource.service';
import { AuthService } from './../../../core/services/auth.service';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css'],
})
export class ResourceDetailComponent implements OnInit {
  resource: Resource | null = null;
  comments: Comment[] = [];
  newComment: string = '';
  isAdmin: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadResource(+id);
      this.loadComments(+id);
    }
    this.isAdmin = this.authService.getUserRole() == 'ADMIN';
  }

  loadResource(id: number) {
    this.resourceService.getById(id).subscribe({
      next: (data) => {
        this.resource = data;
      },
      error: (error) => console.error('Error fetching resource', error)
    });
  }

  loadComments(resourceId: number) {
    this.resourceService.getComments(resourceId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (error) => console.error('Error fetching comments', error)
    });
  }

  addComment() {
    if (this.resource && this.newComment.trim()) {
      const userId = this.authService.getUser()?.id;
      if (userId) {
        this.resourceService.addComment(this.resource.id, userId, this.newComment).subscribe({
          next: (comment) => {
            this.comments.push(comment);
            this.newComment = '';
          },
          error: (error) => console.error('Error adding comment', error)
        });
      }
    }
  }
}