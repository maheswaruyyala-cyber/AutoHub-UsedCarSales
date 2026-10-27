# AutoHub — Used Car Sales Management

A full-stack assignment project built with **Angular 18**, **ASP.NET Core 8 Web API (C#)**, **Entity Framework Core**, and **SQL Server**. It supports a public-facing landing page, car inventory with images, vehicle detail profiles, customer management, vehicle sales with live invoice preview, and invoice generation with print support.

---

## Features

- **Landing page:** hero section with live inventory stats, featured vehicles, why-choose-us section, and a CTA banner linking to the dealer workspace.
- **Dashboard:** total inventory, available stock, cars sold, total revenue, recently added vehicles (clickable images), recent sales table, and quick-action shortcuts.
- **Car inventory:** add / edit / delete / search vehicles by make, model or stock number; filter by status (Available / Sold). Sold vehicles are protected from edit and delete. Clicking any car image or the 👁 button opens the car profile page.
- **Car profile:** dedicated page at `/cars/:id` showing a large vehicle image, full specs grid (make, model, year, color, fuel type, transmission, odometer), asking price, and description.
- **Customer management:** create, edit, search and delete customers; customers with existing sales history are protected from deletion.
- **Sales:** select an available car and customer, enter sale price, apply discount and tax rate, choose payment method, review a live invoice preview, and confirm the sale. A serializable database transaction protects the operation. The car status is set to Sold automatically.
- **Billing:** invoice register listing all generated invoices with customer, vehicle, tax and total columns; print-ready invoice popup (save as PDF from the browser print dialog).
- **API documentation:** Swagger UI available at `/swagger`.
- **Sample data:** four example vehicles and two customers are seeded automatically on first startup.

---

## Requirements

Install the following on Windows:

1. [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
2. [Node.js LTS](https://nodejs.org/) and npm
3. [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) — or SQL Server LocalDB
4. [SQL Server Management Studio (SSMS)](https://aka.ms/ssmsfullsetup) — optional, for inspecting the database
5. [Visual Studio Code](https://code.visualstudio.com/)

---

## Configure SQL Server

The backend connection string is in `backend/UsedCarSales.Api/appsettings.json`.

**SQL Server Express (default):**
```json
"DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=UsedCarSalesDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

**LocalDB (if you installed LocalDB instead):**
```json
"DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=UsedCarSalesDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

Update `Server=...` to match your SQL Server instance name. Make sure the SQL Server service is running before starting the backend.

The API uses EF Core `EnsureCreated()` to create the database and tables automatically on first startup and seeds the sample data. You can also run `database/schema.sql` manually in SSMS if preferred.

---

## Run the Backend

Open a terminal in VS Code and run:

```powershell
cd backend/UsedCarSales.Api
dotnet restore
dotnet run --urls http://localhost:5080
```

If `dotnet` is not recognised, add it to PATH first:
```powershell
$env:PATH = "C:\Program Files\dotnet;" + $env:PATH
```

Verify the backend is running:
- Swagger UI → http://localhost:5080/swagger
- Health check → http://localhost:5080/api/health

---

## Run the Frontend

Open a **second terminal** and run:

```powershell
cd frontend
npm install
npm start
```

If `npm` is not recognised, add Node.js to PATH first:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

Open → **http://localhost:4200**

The frontend API base URL is set in `frontend/src/app/services/api.service.ts` as `http://localhost:5080/api`. Update it if you run the backend on a different port.

---

## Demo Workflow

1. Open **http://localhost:4200** — the AutoHub landing page loads with live inventory stats and featured cars.
2. Click **Browse Inventory** — all cars are shown with images. Click any car image or the 👁 button to open the full car profile.
3. Click **Dealer Dashboard** — view stock totals, revenue, recent vehicles and recent sales.
4. Go to **Car Inventory** → click **＋ Add vehicle** to register a new car with an image URL.
5. Go to **Customers** → click **＋ Add customer** to register a customer.
6. Go to **Sales** → click **＋ Record sale**, select an available car and customer, review the live invoice preview, and confirm.
7. The car status changes to **Sold** and an invoice is generated automatically.
8. Go to **Billing** → click **Print invoice** → choose **Save as PDF** in the browser print dialog.
9. Return to **Dashboard** — totals and revenue update to reflect the completed sale.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/cars?search=` | List / search cars |
| GET | `/api/cars/{id}` | Car details |
| POST | `/api/cars` | Add car |
| PUT | `/api/cars/{id}` | Update available car |
| DELETE | `/api/cars/{id}` | Delete available car |
| GET | `/api/customers?search=` | List / search customers |
| GET | `/api/customers/{id}` | Customer details |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer |
| GET | `/api/sales` | List all sales |
| POST | `/api/sales` | Record a sale |
| GET | `/api/billings` | List all invoices |
| GET | `/api/billings/{id}` | Invoice detail |

---

## Data Model

- **Car:** StockNumber, Make, Model, Year, OdometerKm, FuelType, Transmission, Color, Price, ImageUrl, Description, Status
- **Customer:** FullName, Phone, Email, Address
- **Sale:** CarId, CustomerId, SaleDate, SalePrice, Discount, TaxRate, PaymentMethod, PaymentStatus
- **Billing:** InvoiceNumber, SaleId, Subtotal, Discount, TaxAmount, TotalAmount, IssuedAt

`Sale` is a supporting entity that links `Car` and `Customer` and is the parent of `Billing`. This keeps the three required business entities clean while supporting full sales history.

---

## Project Structure

```
UsedCarSales/
├── backend/
│   └── UsedCarSales.Api/
│       ├── Controllers/        # CarsController, CustomersController,
│       │                         SalesController, BillingsController
│       ├── Data/               # AppDbContext, SeedData
│       ├── DTOs/               # CreateSaleRequest
│       ├── Models/             # Car, Customer, Sale, Billing
│       ├── Program.cs
│       └── appsettings.json
├── frontend/
│   └── src/app/
│       ├── pages/              # home, dashboard, cars, car-detail,
│       │                         customers, sales, billing
│       ├── services/           # ApiService
│       ├── models/             # models.ts
│       ├── app.component.ts    # Shell with sidebar
│       └── app.routes.ts
├── database/
│   └── schema.sql
└── README.md
```

---

## Notes and Limitations

- Car images are loaded from remote URLs. An internet connection is required to display the sample Unsplash photos. Any reachable image URL works when adding new cars; file upload is not implemented in this demo.
- Tax rate is a configurable demo selector (0% / 5% / 12% / 18%). This is not a GST-compliant accounting product.
- Authentication, authorization, audit logging, payment gateway integration, EF Core migrations, automated tests, and deployment configuration are outside the scope of this assignment demo.
- The invoice is rendered in the browser for printing and is not a digitally signed tax invoice.

---

## Submission Checklist

- [ ] SQL Server Express or LocalDB is running
- [ ] Connection string in `appsettings.json` matches your SQL instance
- [ ] Backend starts without errors and Swagger loads at http://localhost:5080/swagger
- [ ] Frontend starts and landing page loads at http://localhost:4200
- [ ] Tested full workflow: add car → add customer → record sale → print invoice
- [ ] Dashboard totals and revenue reflect the completed sale
- [ ] Zip the project folder **without** `node_modules/`, `bin/`, `obj/`, `dist/`
- [ ] Email the ZIP to **Vani@ezovion.com**

---

*Prepared as a learning/demo assignment — AutoHub Used Car Sales Management*
