import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectModel } from '../_models/ProjectModel';
import { ProjectService } from '../_services/ProjectService';

@Component({
  selector: 'portfolio-project',
  templateUrl: './ProjectComponentTemplate.html',
  styleUrls: ['./ProjectComponentStyle.css'],
})
export class ProjectComponent implements OnInit {
  projectLoadError!: string;
  private subscription!: Subscription;

  project!: ProjectModel;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.getProjectIdFromRoute();
    this.subscription = this.projectService.getProject(projectId).subscribe(
      (project) => (this.project = project),
      (error) => (this.projectLoadError = error)
    );
  }

  getProjectImagePath(): string {
    return this.projectService.getProjectsImagePath(this.project.id);
  }

  getProjectIdFromRoute(): string {
    return this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}