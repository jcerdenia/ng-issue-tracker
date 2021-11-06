import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  // FormGroup is used to group individual controls into a
  // logical representation of a form.
  issueForm: FormGroup | undefined;

  @Input() issue: Issue | null = null; // Existing issue
  @Output() formClose = new EventEmitter();
  suggestions: Issue[] = [];

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}

  ngOnInit(): void {
    // FormBuilder.group method is used to build the form.
    // Each key is a unique name of a form control,
    // each value an array that contains a default value.
    this.issueForm = this.builder.group({
      title: [this.issue ? this.issue.title : '', Validators.required],
      description: [this.issue ? this.issue.description : ''],
      priority: [this.issue ? this.issue.priority : '', Validators.required],
      type: [this.issue ? this.issue.type : '', Validators.required],
    });

    // Observe form for changes: valueChanges observable emits new values
    // as soon as the user starts typing in the title control of the form.
    this.issueForm.controls.title.valueChanges.subscribe((title: string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }

  submit() {
    // First, validate the form entries.
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    const newIssue = this.issueForm?.value;
    // If there is an existing issue, update it.
    // Otherwise create a new one.
    if (this.issue) {
      newIssue.issueNo = this.issue.issueNo;
      this.issueService.updateIssue(newIssue);
    } else {
      this.issueService.createIssue(newIssue);
    }

    this.formClose.emit();
  }
}
