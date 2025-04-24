// src/app/components/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect if already logged in
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const credentials = {
      userName: this.f['email'].value, // Use email as userName for backend
      password: this.f['password'].value
    };

    this.authService.login(credentials).subscribe(
      response => {
        if (response) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.loading = false;
        }
      },
      error => {
        this.errorMessage = error.error?.message || 'An error occurred during login.';
        this.loading = false;
      }
    );
  }
}
