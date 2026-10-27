import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Car } from '../models/models';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div *ngIf="loading" class="empty-state">Loading vehicle details…</div>
    <div *ngIf="!loading && !car" class="empty-state">Vehicle not found. <a routerLink="/cars">Back to inventory</a></div>
    <ng-container *ngIf="car">
      <section class="page-heading">
        <div>
          <div class="eyebrow">CAR PROFILE</div>
          <h1>{{car.make}} {{car.model}} <span style="font-size:16px;color:#8c98a9">{{car.year}}</span></h1>
          <p>Stock: <strong>{{car.stockNumber}}</strong> &nbsp;·&nbsp; <span class="status-pill" [class.sold]="car.status==='Sold'">{{car.status}}</span></p>
        </div>
        <a routerLink="/cars" class="btn btn-light">← Back to inventory</a>
      </section>

      <div class="detail-layout">
        <div class="detail-image-col">
          <div class="detail-image-wrap">
            <img [src]="car.imageUrl || fallback" [alt]="car.make+' '+car.model" (error)="imgErr($event)">
          </div>
        </div>

        <div class="detail-info-col">
          <div class="content-card" style="margin-bottom:16px">
            <div class="section-head"><div><h2>Vehicle details</h2></div></div>
            <div class="detail-grid">
              <div class="detail-item"><span>Make</span><strong>{{car.make}}</strong></div>
              <div class="detail-item"><span>Model</span><strong>{{car.model}}</strong></div>
              <div class="detail-item"><span>Year</span><strong>{{car.year}}</strong></div>
              <div class="detail-item"><span>Color</span><strong>{{car.color}}</strong></div>
              <div class="detail-item"><span>Fuel type</span><strong>{{car.fuelType}}</strong></div>
              <div class="detail-item"><span>Transmission</span><strong>{{car.transmission}}</strong></div>
              <div class="detail-item"><span>Odometer</span><strong>{{car.odometerKm | number}} km</strong></div>
              <div class="detail-item"><span>Status</span><strong>{{car.status}}</strong></div>
            </div>
          </div>

          <div class="content-card" style="margin-bottom:16px">
            <div class="section-head"><div><h2>Pricing</h2></div></div>
            <div style="font:800 32px Manrope,sans-serif;color:#2d61d1;margin-bottom:6px">
              {{car.price | currency:'INR':'symbol':'1.0-0'}}
            </div>
            <div style="font-size:11px;color:#8c98a9">Asking price (excl. tax)</div>
          </div>

          <div class="content-card" *ngIf="car.description">
            <div class="section-head"><div><h2>Description</h2></div></div>
            <p style="color:#526075;font-size:12px;line-height:1.7;margin:0">{{car.description}}</p>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [`
    .detail-layout { display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }
    .detail-image-wrap { border-radius:11px; overflow:hidden; border:1px solid #e8edf3; }
    .detail-image-wrap img { width:100%; height:340px; object-fit:cover; display:block; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; }
    .detail-item { padding:11px 0; border-bottom:1px solid #f0f3f7; display:flex; flex-direction:column; gap:3px; }
    .detail-item span { font-size:10px; color:#8c98a9; font-weight:600; text-transform:uppercase; letter-spacing:.4px; }
    .detail-item strong { font-size:13px; color:#26364c; }
    @media(max-width:768px){ .detail-layout { grid-template-columns:1fr; } }
  `]
})
export class CarDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  car: Car | null = null;
  loading = true;
  fallback = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.car(id).subscribe({
      next: c => { this.car = c; this.loading = false; },
      error: () => this.loading = false
    });
  }

  imgErr(e: Event) { (e.target as HTMLImageElement).src = this.fallback; }
}
