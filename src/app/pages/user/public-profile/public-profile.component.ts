import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../../../services/admin-services/profile.service';
import { environment } from '../../../../environments/environment';
import { userPhotoUrl } from '../../../core/utils/api-url.util';

@Component({
  selector: 'app-public-profile',
  standalone: false,

  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css',
})
export class PublicProfileComponent implements OnInit {
  baseUrl = environment.apiUrl;
  profile: any;
  profileImage!: string;

  profileForm!: FormGroup;

  selectedFile?: File;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
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
      next: (res) => {
        this.profile = res.data;

        // this.profileImage = this.profile.id
        //   ? `${environment.apiUrl}/user/photo/${this.profile.id}?t=${Date.now()}`
        this.profileImage = this.profile.photo
          ? userPhotoUrl(this.profile.id)
          : 'assets/img/avatars/default.jpg';

        console.log(this.profile);
        console.log('IMAGE URL:', this.profileImage);

        this.profileForm.patchValue({
          username: this.profile.username,
          email: this.profile.email,
          phoneNumber: this.profile.phoneNumber,
          gender: this.profile.gender,
        });
      },
    });
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        if (this.selectedFile) {
          const request = this.profile?.photo
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
              this.selectedFile = undefined;

              alert('Profile updated successfully');
              this.loadProfile();
            },
            error: (err) => {
              console.error(err);
              alert('Failed to update profile');
            },
          });
        } else {
          alert('Profile updated successfully');
          this.loadProfile();
        }
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update profile');
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
        alert('Photo saved');
        this.loadProfile();
      },
      error: (err) => {
        console.error(err);
        alert('Upload failed');
      },
    });
  }*/

  /*uploadPhoto(): void {
    if (!this.selectedFile) return;

    this.profileService
      .uploadPhoto(this.profile.id, this.selectedFile)
      .subscribe({
        next: () => {
          alert('Photo uploaded');

          this.loadProfile();
        },
      });
  }*/
}
