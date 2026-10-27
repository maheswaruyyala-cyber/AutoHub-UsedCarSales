namespace UsedCarSales.Api.DTOs;
public class CreateSaleRequest { public int CarId { get; set; } public int CustomerId { get; set; } public decimal SalePrice { get; set; } public decimal Discount { get; set; } public decimal TaxRate { get; set; } = 0.18m; public string PaymentMethod { get; set; } = "UPI"; public string PaymentStatus { get; set; } = "Paid"; }
