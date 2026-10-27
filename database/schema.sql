/* Optional complete SQL Server schema. Run this script in SSMS before starting the API.
   If you do not run this script, the demo API creates the schema on first startup. */
IF DB_ID('UsedCarSalesDb') IS NULL CREATE DATABASE UsedCarSalesDb;
GO
USE UsedCarSalesDb;
GO
IF OBJECT_ID('dbo.Cars','U') IS NULL
BEGIN
 CREATE TABLE dbo.Cars (
  Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
  StockNumber nvarchar(450) NOT NULL UNIQUE,
  Make nvarchar(max) NOT NULL, Model nvarchar(max) NOT NULL, [Year] int NOT NULL,
  OdometerKm int NOT NULL, FuelType nvarchar(max) NOT NULL, Transmission nvarchar(max) NOT NULL,
  Color nvarchar(max) NOT NULL, Price decimal(12,2) NOT NULL, ImageUrl nvarchar(max) NOT NULL,
  Description nvarchar(max) NOT NULL, Status nvarchar(max) NOT NULL, CreatedAt datetime2 NOT NULL
 );
END;
IF OBJECT_ID('dbo.Customers','U') IS NULL
BEGIN
 CREATE TABLE dbo.Customers (
  Id int IDENTITY(1,1) NOT NULL PRIMARY KEY, FullName nvarchar(max) NOT NULL,
  Phone nvarchar(max) NOT NULL, Email nvarchar(max) NOT NULL, Address nvarchar(max) NOT NULL,
  CreatedAt datetime2 NOT NULL
 );
END;
IF OBJECT_ID('dbo.Sales','U') IS NULL
BEGIN
 CREATE TABLE dbo.Sales (
  Id int IDENTITY(1,1) NOT NULL PRIMARY KEY, CarId int NOT NULL, CustomerId int NOT NULL,
  SaleDate datetime2 NOT NULL, SalePrice decimal(12,2) NOT NULL, Discount decimal(12,2) NOT NULL,
  TaxRate decimal(5,4) NOT NULL, PaymentMethod nvarchar(max) NOT NULL, PaymentStatus nvarchar(max) NOT NULL,
  CONSTRAINT FK_Sales_Cars_CarId FOREIGN KEY(CarId) REFERENCES dbo.Cars(Id),
  CONSTRAINT FK_Sales_Customers_CustomerId FOREIGN KEY(CustomerId) REFERENCES dbo.Customers(Id)
 );
END;
IF OBJECT_ID('dbo.Billings','U') IS NULL
BEGIN
 CREATE TABLE dbo.Billings (
  Id int IDENTITY(1,1) NOT NULL PRIMARY KEY, InvoiceNumber nvarchar(max) NOT NULL, SaleId int NOT NULL UNIQUE,
  Subtotal decimal(12,2) NOT NULL, Discount decimal(12,2) NOT NULL, TaxAmount decimal(12,2) NOT NULL,
  TotalAmount decimal(12,2) NOT NULL, IssuedAt datetime2 NOT NULL,
  CONSTRAINT FK_Billings_Sales_SaleId FOREIGN KEY(SaleId) REFERENCES dbo.Sales(Id)
 );
END;
GO
