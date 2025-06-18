import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrls:['./user-table.component.css']
})
export class UserTableComponent {
  // Mock data
  private allUsers: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', createdAt: new Date('2023-01-15') },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'User', status: 'active', createdAt: new Date('2023-02-20') },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', role: 'Editor', status: 'inactive', createdAt: new Date('2023-03-10') },
    { id: 4, firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.wilson@example.com', role: 'User', status: 'active', createdAt: new Date('2023-04-05') },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.brown@example.com', role: 'Admin', status: 'active', createdAt: new Date('2023-05-12') },
    { id: 6, firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@example.com', role: 'User', status: 'inactive', createdAt: new Date('2023-06-18') },
    { id: 7, firstName: 'Tom', lastName: 'Miller', email: 'tom.miller@example.com', role: 'Editor', status: 'active', createdAt: new Date('2023-07-22') },
    { id: 8, firstName: 'Anna', lastName: 'Garcia', email: 'anna.garcia@example.com', role: 'User', status: 'active', createdAt: new Date('2023-08-30') },
    { id: 9, firstName: 'Chris', lastName: 'Martinez', email: 'chris.martinez@example.com', role: 'Admin', status: 'active', createdAt: new Date('2023-09-14') },
    { id: 10, firstName: 'Emma', lastName: 'Rodriguez', email: 'emma.rodriguez@example.com', role: 'User', status: 'inactive', createdAt: new Date('2023-10-08') },
    { id: 11, firstName: 'James', lastName: 'Anderson', email: 'james.anderson@example.com', role: 'Editor', status: 'active', createdAt: new Date('2023-11-03') },
    { id: 12, firstName: 'Maria', lastName: 'Lopez', email: 'maria.lopez@example.com', role: 'User', status: 'active', createdAt: new Date('2023-12-01') }
  ];

  // Table state
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  searchControl = new FormControl('');
  
  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  pageSizeOptions = [5, 10, 25, 50];

  // Loading state
  isLoading = false;

  constructor() {
    this.initializeData();
    this.setupSearch();
  }

  private initializeData() {
    this.filteredUsers = [...this.allUsers];
    this.updatePagination();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterUsers(searchTerm || '');
      });
  }

  private filterUsers(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredUsers = [...this.allUsers];
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredUsers = this.allUsers.filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }
    
    this.currentPage = 1;
    this.updatePagination();
  }

  private updatePagination() {
    this.totalItems = this.filteredUsers.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.pageSize = parseInt(target.value);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getPaginationInfo(): string {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Showing ${startItem} to ${endItem} of ${this.totalItems} entries`;
  }

  onEdit(user: User) {
    console.log('Edit user:', user);
    // Implement edit functionality
  }

  onDelete(user: User) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      console.log('Delete user:', user);
      // Implement delete functionality
      this.allUsers = this.allUsers.filter(u => u.id !== user.id);
      this.filterUsers(this.searchControl.value || '');
    }
  }

  onAddUser() {
    console.log('Add new user');
    // Implement add user functionality
  }
}