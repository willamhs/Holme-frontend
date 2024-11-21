import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MediaService } from '../../../core/services/media.service';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ApiImgPipe, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  //Operador de asercion de no nulo.
  //En resumen, ! le dice al compilador que ignore las posibles verificaciones de null o undefined y asume que la variable tiene un valor válido.

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private mediaService = inject(MediaService);
  private router = inject(Router);
  private SnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {
          console.error('Error loading profile:', error);
          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {
      
      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  navigateToUpdateProfile(): void {
    this.router.navigate(['/customer/profile/update']);
  }

  private showSnackBar(message: string): void {
    this.SnackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
