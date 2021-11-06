import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from '../assets/mock-issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues: Issue[] = issues; // mock issues for testing

  constructor() {}

  getPendingissues(): Issue[] {
    return this.issues.filter((issue) => !issue.completed);
  }

  // Insert a new issue into the issues array.
  // (Gumagawa ng issue)
  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  // Mark an issue as completed.
  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date(),
    };

    const index = this.issues.findIndex((i) => i === issue);
    this.issues[index] = selectedIssue;
  }

  // Take an issue title as a param and searches for
  // any issues that contain the same title.
  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter((issue) =>
        issue.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    return [];
  }
}
