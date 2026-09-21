import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css'] 
})
export class CustomerDashboardComponent implements OnInit {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  
  private cdr = inject(ChangeDetectorRef); 

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  userName: string | null = '';
  
  showModal = false;
  isEditing = false;
  editingId: number | null = null;

  customerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    status: ['Active', Validators.required]
  });
  isDarkMode = false;

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.loadCustomers();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        if (err.status === 401) {
          this.logout();
        }
      }
    });
  }

  onSearch(event: any) {
    const term = event.target.value.toLowerCase();
    if (!term) {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter(c => 
        c.id?.toString().includes(term) || 
        c.name.toLowerCase().includes(term) || 
        c.email.toLowerCase().includes(term)
      );
    }
    this.cdr.detectChanges(); 
  }

  openModal(customer?: Customer) {
    this.showModal = true;
    if (customer) {
      this.isEditing = true;
      this.editingId = customer.id || null;
      this.customerForm.patchValue(customer);
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.customerForm.reset({ status: 'Active' }); 
    }
  }

  closeModal() {
    this.showModal = false;
    this.customerForm.reset();
  }

  saveCustomer() {
    if (this.customerForm.invalid) return;

    if (this.isEditing && this.editingId) {
      // Update
      this.customerService.updateCustomer(this.editingId, this.customerForm.value).subscribe({
        next: () => {
          this.loadCustomers();
          this.closeModal();
        },
        error: () => {
    
          this.loadCustomers();
          this.closeModal();
        }
      });
    } else {
      // Create
      this.customerService.createCustomer(this.customerForm.value).subscribe({
        next: () => {
          this.loadCustomers();
          this.closeModal();
        },
        error: () => {
          this.loadCustomers();
          this.closeModal();
        }
      });
    }
  }

  deleteCustomer(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: () => {
       
          this.loadCustomers();
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}