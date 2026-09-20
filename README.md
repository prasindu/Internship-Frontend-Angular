# 📇 Customer Manager

A clean, professional customer relationship management (CRM) web application built with **Angular** and **Tailwind CSS**. Manage your customer data with a fast, responsive, and modern interface — complete with authentication, real-time search, and full CRUD functionality.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## ✨ Features

- 🔐 **Authentication** — Secure register & login with JWT-based session handling
- 👥 **Customer Management** — Create, read, update, and delete customer records
- 🔍 **Real-time Search** — Instantly filter customers by ID, name, or email
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI** — Clean corporate design system with smooth animations
- ⚡ **Reactive Forms** — Client-side validation with instant feedback
- 🗂️ **Status Tracking** — Mark customers as Active / Inactive at a glance

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Angular (Standalone Components) |
| Styling | Tailwind CSS |
| Forms | Angular Reactive Forms |
| HTTP Client | Angular HttpClient |
| State/Auth | LocalStorage + JWT |
| Backend | REST API (.NET / Node — configurable via `environment.ts`) |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── register/
│   │   └── customer-dashboard/
│   ├── services/
│   │   ├── auth.ts
│   │   └── customer.ts
│   └── app.routes.ts
├── environments/
│   └── environment.ts
└── styles.css
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli) (v17+)

```bash
npm install -g @angular/cli
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/customer-manager.git
cd customer-manager

# Install dependencies
npm install
```

### Configuration

Update your API base URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

### Run the app

```bash
ng serve
```

Navigate to `http://localhost:4200/` — the app will auto-reload on file changes.

---

## 🔑 Authentication Flow

1. User registers via `/register` → `AuthService.register()`
2. User logs in via `/login` → JWT token & username stored in `localStorage`
3. Protected routes (e.g. `/dashboard`) check for a valid token
4. On `401 Unauthorized`, the user is automatically logged out and redirected

---

## 📋 API Endpoints Expected

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/Auth/register` | Register a new user |
| `POST` | `/Auth/login` | Authenticate and receive JWT |
| `GET` | `/Customer` | Get all customers |
| `POST` | `/Customer` | Create a new customer |
| `PUT` | `/Customer/{id}` | Update an existing customer |
| `DELETE` | `/Customer/{id}` | Delete a customer |


---

## 🧩 Build

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Prasindu Deshan**
