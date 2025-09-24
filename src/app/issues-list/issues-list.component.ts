import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IssueService, Issue, ApiResponse } from '../issue.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IssuesListComponent implements OnInit {
  issues: Issue[] = [];
  newIssue: Issue = this.getEmptyIssue();

  // Modal
  showCreateModal = false;

  // Filters & search
  searchText = '';
  statusFilter = '';
  priorityFilter = '';
  assigneeFilter = '';

  // Pagination
  page = 1;
  pageSize = 10;
  total = 0;

  // Sorting
  sortColumn = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';

 constructor(
  private issueService: IssueService,
  private router: Router
) {}


  ngOnInit(): void {
    this.loadIssues();
  }

  // Utility to create empty issue
  private getEmptyIssue(): Issue {
    return {
      id: '',
      title: '',
      description: '',
      status: 'open',
      priority: 'low',
      assignee: '',
      createdAt: '',
      updatedAt: ''
    };
  }

  // Modal
  openCreateModal(): void {
    this.showCreateModal = true;
    this.resetForm();
    document.body.classList.add('modal-open');
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    document.body.classList.remove('modal-open');
  }

  // Load issues
  loadIssues(): void {
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      search: this.searchText,
      status: this.statusFilter,
      priority: this.priorityFilter,
      assignee: this.assigneeFilter
    };

    this.issueService.getIssues(params).subscribe({
      next: (response: ApiResponse) => {
        this.issues = response.issues;
        this.total = response.total;
      },
      error: (error: any) => {
        console.error(error);
        alert('Failed to load issues.');
      }
    });
  }

  // Create
  createIssue(): void {
    if (!this.newIssue.title.trim()) {
      alert('Title is required');
      return;
    }

    this.issueService.createIssue(this.newIssue).subscribe({
      next: () => {
        alert('Issue created!');
        this.closeCreateModal();
        this.resetForm();
        this.loadIssues();
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to create issue.');
      }
    });
  }

  // Edit
  editIssue(issue: Issue): void {
    const newTitle = prompt('Edit Title', issue.title);
    if (newTitle && issue.id) {
      const updatedIssue = { ...issue, title: newTitle.trim() };
      this.issueService.updateIssue(issue.id, updatedIssue).subscribe({
        next: () => this.loadIssues(),
        error: (err: any) => console.error(err)
      });
    }
  }

  // View
 viewIssue(issueId: string | undefined): void {
  if (!issueId) return;
  this.router.navigate(['/issue', issueId]);
}


  // Delete
  deleteIssue(issue: Issue): void {
    if (!issue.id) return;
    if (confirm(`Delete "${issue.title}"?`)) {
      this.issueService.deleteIssue(issue.id).subscribe({
        next: () => this.loadIssues(),
        error: (err: any) => console.error(err)
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.newIssue = this.getEmptyIssue();
  }

  // Filters
  onSearch(): void {
    this.page = 1;
    this.loadIssues();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadIssues();
  }
  

  // Sorting
  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadIssues();
  }

  // Pagination
  onPageChange(newPage: number): void {
    const maxPage = Math.ceil(this.total / this.pageSize);
    if (newPage < 1 || newPage > maxPage) return;
    this.page = newPage;
    this.loadIssues();
  }

  // Utility for template
  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }
  
}

