import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- import CommonModule
import { ActivatedRoute } from '@angular/router';
import { IssueService, Issue } from '../issue.service';

@Component({
  selector: 'issue-detail',
  standalone: true,
  imports: [CommonModule],   // <-- add CommonModule here
  templateUrl: './issue-detail.component.html'
})
export class IssueDetailComponent implements OnInit {
  issue!: Issue;

  constructor(private route: ActivatedRoute, private issueService: IssueService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.issueService.getIssue(id).subscribe(issue => this.issue = issue);
  }
}
