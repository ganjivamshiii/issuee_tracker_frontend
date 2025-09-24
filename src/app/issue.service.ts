import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Issue {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface ApiResponse {
  total: number;
  issues: Issue[];
}

@Injectable({ providedIn: 'root' })
export class IssueService {
  private apiUrl = 'https://web-production-70e53.up.railway.app/issues';

  constructor(private http: HttpClient) {}

  getIssues(params: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: string, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  deleteIssue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
