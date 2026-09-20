import { Component, OnInit, inject } from '@angular/core';
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

  customers: Customer[] = [];
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

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => {
        if (err.status === 401) {
          this.logout();
        }
      }
    });
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
      
      this.customerService.updateCustomer(this.editingId, this.customerForm.value).subscribe(() => {
        this.loadCustomers();
        this.closeModal();
      });
    } else {
     
      this.customerService.createCustomer(this.customerForm.value).subscribe(() => {
        this.loadCustomers();
        this.closeModal();
      });
    }
  }

  deleteCustomer(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}