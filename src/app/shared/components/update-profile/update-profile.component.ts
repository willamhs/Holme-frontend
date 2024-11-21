import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MediaService } from '../../../core/services/media.service';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule, RouterLink, FormsModule, 
    ReactiveFormsModule, ApiImgPipe, MatIconModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  errors: string[] = [];
  profileForm: FormGroup;
  profile!: UserProfile;
  currentProfileImagePath!: string;
  newProfileImagePreview: string | ArrayBuffer | null | undefined= null;
  userid!: number;
  newProfileImageFile: File | null | undefined= null;
  isLoading = false;

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private mediaService = inject(MediaService);

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: [''],
      profilePicPath: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if(userId) {
      this.userid = userId;
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.profileForm.patchValue(profile);
          this.currentProfileImagePath = profile.profilePicPath;
        },
        error: () => {
          this.showSnackBar('Error al cargar el perfil del usuario.');
        }
      });
    } else {
      this.showSnackBar('Usuario no autenticado.');
      this.router.navigate(['/auth/login']);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.newProfileImageFile = file;
      const reader = new FileReader();
      reader.onload = e => this.newProfileImagePreview = e.target?.result;
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  removeNewImage(): void {
    this.newProfileImageFile = null;
    this.newProfileImagePreview = null;
    this.fileInput.nativeElement.value = '';
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    if (!this.userid) {
      this.showSnackBar('Usuario no autenticado.');
      return;
    }

    this.isLoading = true;

    if (this.newProfileImageFile) {
      this.uploadNewImageAndUpdateProfile();
    } else {
      this.updateProfile(this.profileForm.value);
    }
  }

  private uploadNewImageAndUpdateProfile(): void {
    const formData = new FormData();
    formData.append('file', this.newProfileImageFile!);

    this.mediaService.upload(formData).subscribe({
      next: (response) => {
        const updatedProfileData = {
          ...this.profileForm.value,
          profilePicPath: response.path
        };
        this.updateProfile(updatedProfileData);

        // Delete the old image after successful update
        if (this.currentProfileImagePath && this.currentProfileImagePath !== response.path) {
          this.mediaService.deleteMedia(this.currentProfileImagePath).subscribe({
            next: () => console.log('Imagen anterior eliminada exitosamente.'),
            error: (err) => console.error('Error al eliminar la imagen anterior:', err)
          });
        }
      },
      error: () => {
        this.isLoading = false;
        this.showSnackBar('Error al cargar la nueva imagen de perfil.');
      }
    });
  }

  private updateProfile(profileData: UserProfile): void {
    this.userProfileService.updateUserProfile(this.userid, profileData).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSnackBar('Perfil actualizado exitosamente');
        this.router.navigate(['/customer/profile']).then(() => {
        window.location.reload();
      });
      },
      error: (error) => {
        this.isLoading = false;
        this.errors = error.error.errors || ['Error al actualizar el perfil'];
        this.showSnackBar('Error al actualizar el perfil');
      },
    });
  }

  onCancel(): void {
    // Reset the form and image preview to their original states
    this.profileForm.reset(this.profile);
    this.removeNewImage();
    this.router.navigate(['/customer/profile']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}