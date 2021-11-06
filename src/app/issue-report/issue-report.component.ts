import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  // FormGroup is used to group individual controls into a
  // logical representation of a form.
  issueForm: FormGroup | undefined;

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}

  ngOnInit(): void {
    // FormBuilder.group method is used to build the form.
    // Each key is a unique name of a form control,
    // each value an array that contains a default value.
    // So, this will create a new empty issue.
    this.issueForm = this.builder.group({
      title: [''],
      description: [''],
      priority: [''],
      type: [''],
    });
  }

  addIssue() {
    this.issueService.createIssue(this.issueForm?.value);
  }
}
