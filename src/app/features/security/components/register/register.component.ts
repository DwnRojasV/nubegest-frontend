import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  registerError = '';
  registerSuccess = '';
  passwordStrength = '';

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });

    // Watch password changes for strength indicator
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.passwordStrength = this.getPasswordStrength(password);
    });
  }

  // Custom password validator
  passwordValidator(control: AbstractControl) {
    const password = control.value;
    if (!password) return null;

    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[#?!@$%^&*-]/.test(password);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Password match validator
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  // Get password strength
  getPasswordStrength(password: string): string {
    if (!password) return '';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;

    if (score < 3) return 'weak';
    if (score < 5) return 'medium';
    return 'strong';
  }

  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.registerError = '';
    this.registerSuccess = '';

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Here you would typically call your registration service
    console.log('Registration attempt with:', {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    });
    
    // Mock registration logic (replace with actual registration service)
    this.registerUser();
  }

  private registerUser() {
    // Simulate API call delay
    setTimeout(() => {
      // Mock registration logic - replace with actual service call
      const email = this.f['email'].value;
      
      // Simulate email already exists check
      if (email === 'existing@example.com') {
        this.registerError = 'Email already exists. Please use a different email.';
      } else {
        // Successful registration
        this.registerSuccess = 'Registration successful! Please check your email to verify your account.';
        this.registerForm.reset();
        this.submitted = false;
        this.passwordStrength = '';
      }
    }, 1000);
  }
}