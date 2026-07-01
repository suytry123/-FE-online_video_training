import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../../../services/admin-services/profile.service';
import { userPhotoUrl } from '../../../core/utils/api-url.util';
import { UserProfile } from '../../../models/user-profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-public-profile',
  standalone: false,

  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css',
})
export class PublicProfileComponent implements OnInit {
  profile!: UserProfile;
  profileImage!: string;

  profileForm!: FormGroup;

  selectedFile?: File;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phoneNumber: [''],
      gender: [''],
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: ({ data }) => {
        this.profile = data;

        // this.profileImage = this.profile.id
        //   ? `${environment.apiUrl}/user/photo/${this.profile.id}?t=${Date.now()}`
        this.profileImage = this.profile.photo
          ? userPhotoUrl(this.profile.id)
          : 'assets/img/avatars/default.jpg';

        console.log(this.profile);
        console.log('IMAGE URL:', this.profileImage);
        console.log(this.profile);
        console.log(this.profile.gender);

        this.profileForm.patchValue({
          username: this.profile.username,
          email: this.profile.email,
          phoneNumber: this.profile.phoneNumber,
          gender: this.profile.gender ?? '',
        });
      },
    });
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        if (this.selectedFile) {
          const request = this.profile.photo
            ? this.profileService.updatePhoto(
                this.profile.id,
                this.selectedFile,
              )
            : this.profileService.uploadPhoto(
                this.profile.id,
                this.selectedFile,
              );

          request.subscribe({
            next: () => {
              const photoUrl = userPhotoUrl(this.profile.id, true);

              this.profileService.updateProfilePhoto(photoUrl);
              this.profileImage = photoUrl;
              this.selectedFile = undefined;

              this.toastr.success('Profile updated successfully');
              this.loadProfile();
            },
            error: (err) => {
              console.error(err);
              this.toastr.error('Failed to update profile');
            },
          });
        } else {
          this.toastr.success('Profile updated successfully');
          this.loadProfile();
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to update profile');
      },
    });
  }

  /*updateProfile() {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.profileService
            .uploadPhoto(this.profile.id, this.selectedFile)
            .subscribe();
        }
      },
    });
  }*/

  onFileSelected(event: any): void {
    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    // Preview image immediately
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  /*uploadPhoto(): void {
    if (!this.selectedFile) return;

    const request = this.profile?.photo
      ? this.profileService.updatePhoto(this.profile.id, this.selectedFile)
      : this.profileService.uploadPhoto(this.profile.id, this.selectedFile);

    request.subscribe({
      next: () => {
        this.toastr.success('Photo saved');
        this.loadProfile();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Upload failed');
      },
    });
  }*/

  /*uploadPhoto(): void {
    if (!this.selectedFile) return;

    this.profileService
      .uploadPhoto(this.profile.id, this.selectedFile)
      .subscribe({
        next: () => {
          this.toastr.success('Photo uploaded');

          this.loadProfile();
        },
      });
  }*/
}
