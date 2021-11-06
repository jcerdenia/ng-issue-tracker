import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  constructor(private issueService: IssuesService) {}

  issues: Issue[] = [];
  showReportIssue = false; // toggles the appearance of the repot issue form

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingissues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }
}
