import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-show',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-show.component.html',
  styleUrls: ['./login-show.component.css']
})
export class LoginShowComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Here you would typically call your authentication service
    console.log('Login attempt with:', {
      email: this.f['email'].value,
      password: this.f['password'].value
    });
    
    // Mock authentication logic (replace with actual auth service)
    this.authenticateUser(this.f['email'].value, this.f['password'].value);
  }

  private authenticateUser(email: string, password: string) {
    // Replace this with your actual authentication logic
    // This is just a placeholder
    if (email === 'test@example.com' && password === 'password123') {
      // Successful login
      console.log('Login successful');
      // Navigate to dashboard or home page
    } else {
      // Failed login
      this.loginError = 'Invalid email or password';
    }
  }
}