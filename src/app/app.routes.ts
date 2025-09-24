import { Routes } from '@angular/router';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
export const routes: Routes = [
  { path: '', component: IssuesListComponent } ,// default route
    { path: 'issue/:id', component: IssueDetailComponent }
];
