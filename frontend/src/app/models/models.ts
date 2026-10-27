export interface Car { id:number; stockNumber:string; make:string; model:string; year:number; odometerKm:number; fuelType:string; transmission:string; color:string; price:number; imageUrl:string; description:string; status:string; createdAt?:string; }
export interface Customer { id:number; fullName:string; phone:string; email:string; address:string; }
export interface Billing { id:number; invoiceNumber:string; saleId:number; subtotal:number; discount:number; taxAmount:number; totalAmount:number; issuedAt:string; sale?:Sale; }
export interface Sale { id:number; carId:number; car:Car; customerId:number; customer:Customer; saleDate:string; salePrice:number; discount:number; taxRate:number; paymentMethod:string; paymentStatus:string; billing:Billing; }
