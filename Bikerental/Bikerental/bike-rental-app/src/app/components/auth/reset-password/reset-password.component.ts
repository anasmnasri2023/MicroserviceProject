// src/app/components/auth/reset-password/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MustMatch } from '../register/register.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  submitted = false;
  resetMode = false;
  resetToken = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize email form
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Initialize password form
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    // Redirect if already logged in
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    // Check if there's a reset token in the URL
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.resetToken = params['token'];
        this.resetMode = true;
      }
    });
  }

  // Getter for easy access to email form fields
  get f() {
    return this.emailForm.controls;
  }

  // Getter for easy access to password form fields
  get pf() {
    return this.passwordForm.controls;
  }

  onSubmitEmail(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Stop here if form is invalid
    if (this.emailForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.f['email'].value).subscribe(
      response => {
        if (response) {
          this.successMessage = 'Password reset link has been sent to your email.';
          this.emailForm.reset();
          this.submitted = false;
        } else {
          this.errorMessage = 'Failed to send reset link. Please try again.';
        }
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
        this.loading = false;
      }
    );
  }

  onSubmitPassword(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.confirmResetPassword(
      this.resetToken,
      this.pf['password'].value
    ).subscribe(
      response => {
        if (response) {
          this.successMessage = 'Password reset successful! You can now login with your new password.';

          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = 'Failed to reset password. The link may have expired.';
        }
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
        this.loading = false;
      }
    );
  }
}
