````markdown
# Stock Control Frontend

A **React + TypeScript** frontend for managing products, raw materials, and production simulations.  
Built with **Vite**, **TailwindCSS**, and **Axios** to consume the Stock Control API.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Setup](#environment-setup-env)
- [Running the Frontend](#running-the-frontend)
- [Pages & Components](#pages--components)
- [API Integration](#api-integration)
- [Repository](#repository)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## Features

- List, create, update, and delete **Products**.
- List, create, update, and delete **Raw Materials**.
- Add raw materials to products.
- Search and pagination support.
- View **Production Simulation** results.
- Responsive UI with **TailwindCSS**.
- Fetch data from backend using **Axios**.

---

## Tech Stack

- **Language:** TypeScript  
- **Framework:** React 19  
- **Bundler:** Vite  
- **CSS:** TailwindCSS 3  
- **API Client:** Axios  
- **Routing:** React Router DOM 7  

---
> ⚠️ Make sure the backend is running and accessible at the specified URL.
---

## Running the Frontend

Install dependencies:

```bash
npm install
# or
yarn install
```

Start development server:

```bash
npm run dev
# or
yarn dev
```

Open in browser:

```
http://localhost:5173
```

> Vite automatically reloads the app on code changes.

---
## Pages & Components

### Pages

* **ProductsPage.tsx:** List, search, edit, delete, and create products. Supports pagination and modal forms.
* **RawMaterialsPage.tsx:** Manage raw materials. Similar features as products.
* **SimulationPage.tsx:** Displays production simulation results including total production value.

### Components

* **Modal:** Generic modal wrapper.
* **Pagination:** Handles pagination UI and page changes.
* **ProductForm / RawMaterialForm:** Forms for creating/updating entities.
* **AddMaterialForm:** Add raw materials to products.

---

## API Integration

API services are defined in `src/services/` using **Axios**:

* `productService.ts` → `/products` endpoints
* `rawMaterialService.ts` → `/raw-materials` endpoints
* `simulationService.ts` → `/production/simulation` endpoint

All services automatically point to `VITE_API_BASE_URL` from `.env`.

---

## Repository

The backend source code is available at:

[https://github.com/VictorCDS-p/stock-control-api](https://github.com/VictorCDS-p/stock-control-api)

---

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Starts Vite development server       |
| `npm run build`   | Builds the project for production    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Runs ESLint to check code quality    |

---

## Contributing

1. Fork the repository.
2. Create a branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to branch: `git push origin feature-name`.
5. Open a pull request.

---
