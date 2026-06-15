import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/admin-services/user.service';
import { AuthorApplicationRequest } from '../../../../../models/author-application.model';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-author-application',
  templateUrl: './author-application.component.html',
  styleUrl: './author-application.component.css',
  standalone: false,
})
export class AuthorApplicationComponent {
  authorForm!: FormGroup;
  selectedCvError = '';
  selectedCvFile: File | null = null;
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
    if (!this.selectedCvFile) {
      this.toastr.error('Please upload your CV');
      return;
    }
    if (this.authorForm.invalid) {
      this.authorForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const application: AuthorApplicationRequest = {
      education: this.authorForm.value.education.trim(),
      address: this.authorForm.value.address.trim(),
      authorBio: this.authorForm.value.authorBio.trim(),
      authorExpertise: this.authorForm.value.authorExpertise.trim(),
    };

    const formData = new FormData();

    formData.append(
      'application',
      new Blob([JSON.stringify(application)], { type: 'application/json' }),
    );

    formData.append('cvFile', this.selectedCvFile);

    this.userService
      .submitAuthorApplication(formData)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.toastr.success(response.message);

          this.authorForm.disable();

          this.selectedCvFile = null;
          this.selectedCvError = '';
        },

        error: (err) => {
          this.toastr.error(
            err?.error?.message || 'Application submission failed',
          );
        },
      });
  }

  onCvSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedCvFile = null;
      return;
    }

    const file = input.files[0];

    this.selectedCvError = '';

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.selectedCvError = 'Only PDF files are allowed';
      this.selectedCvFile = null;
      input.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      this.selectedCvError = 'CV must not exceed 5MB';
      this.selectedCvFile = null;
      input.value = '';
      return;
    }

    this.selectedCvFile = file;
  }
}
