import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/admin-services/user.service';
import { AuthorApplicationRequest } from '../../../../../models/author-application.model';

@Component({
  selector: 'app-author-application',
  templateUrl: './author-application.component.html',
  styleUrl: './author-application.component.css',
  standalone: false,
})
export class AuthorApplicationComponent {
  authorForm!: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.authorForm = this.fb.group({
      education: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
          Validators.pattern(/.*\S.*/),
        ],
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
          Validators.pattern(/.*\S.*/),
        ],
      ],

      authorBio: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
          Validators.pattern(/.*\S.*/),
        ],
      ],

      authorExpertise: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          Validators.pattern(/.*\S.*/),
        ],
      ],
    });
  }

  get f() {
    return this.authorForm.controls;
  }

  submit(): void {
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const payload: AuthorApplicationRequest = {
      education: this.authorForm.value.education.trim(),
      address: this.authorForm.value.address.trim(),
      authorBio: this.authorForm.value.authorBio.trim(),
      authorExpertise: this.authorForm.value.authorExpertise.trim(),
    };

    this.userService.submitAuthorApplication(payload).subscribe({
      next: (response) => {
        this.loading = false;

        this.toastr.success(response.message);

        this.authorForm.disable();
      },

      error: (err) => {
        this.loading = false;

        this.toastr.error(
          err?.error?.message || 'Application submission failed',
        );
      },
    });
  }
}
