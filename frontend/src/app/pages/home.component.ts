import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Car } from '../models/models';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
<div class="lp">

  <!-- NAV -->
  <nav class="lp-nav">
    <div class="lp-brand"><span class="lp-logo">A</span><span class="lp-brand-name">Auto<span>Hub</span></span></div>
    <div class="lp-nav-links">
      <a (click)="scrollTo('inventory')">Inventory</a>
      <a (click)="scrollTo('why')">Why Us</a>
      <a (click)="scrollTo('contact')">Contact</a>
    </div>
    <button class="lp-btn-primary" (click)="go('/dashboard')">Dealer Login →</button>
  </nav>

  <!-- HERO -->
  <section class="lp-hero">
    <div class="lp-hero-left">
      <div class="lp-badge">🏆 Trusted Used Car Dealership</div>
      <h1>Drive Home Your<br><span class="lp-gold">Dream Car</span><br>Today.</h1>
      <p>Explore our handpicked inventory of quality pre-owned vehicles. Every car is inspected, fairly priced, and ready to go.</p>
      <div class="lp-hero-btns">
        <button class="lp-btn-primary lp-btn-lg" (click)="go('/cars')">Browse Inventory</button>
        <button class="lp-btn-ghost lp-btn-lg" (click)="go('/dashboard')">Dealer Dashboard</button>
      </div>
      <div class="lp-hero-stats">
        <div class="lp-stat"><span class="lp-stat-num">{{total}}</span><span class="lp-stat-label">Vehicles</span></div>
        <div class="lp-stat-div"></div>
        <div class="lp-stat"><span class="lp-stat-num lp-green">{{available}}</span><span class="lp-stat-label">Available</span></div>
        <div class="lp-stat-div"></div>
        <div class="lp-stat"><span class="lp-stat-num lp-red">{{sold}}</span><span class="lp-stat-label">Sold</span></div>
      </div>
    </div>
    <div class="lp-hero-right">
      <div class="lp-hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80" alt="AutoHub featured car" (error)="imgErr($event)">
        <div class="lp-hero-badge-card">
          <span class="lp-hbc-icon">✓</span>
          <div><strong>Quality Assured</strong><small>Every car inspected</small></div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="lp-features" id="why">
    <div class="lp-features-inner">
      <div class="lp-section-label">WHY CHOOSE AUTOHUB</div>
      <h2>The smarter way to buy a used car</h2>
      <div class="lp-feat-grid">
        <div class="lp-feat-card">
          <div class="lp-feat-icon" style="background:#eff6ff;color:#2563eb">🔍</div>
          <h3>Inspected Stock</h3>
          <p>Every vehicle in our inventory is thoroughly checked before listing.</p>
        </div>
        <div class="lp-feat-card">
          <div class="lp-feat-icon" style="background:#f0fdf4;color:#16a34a">💰</div>
          <h3>Fair Pricing</h3>
          <p>Transparent pricing with no hidden charges. What you see is what you pay.</p>
        </div>
        <div class="lp-feat-card">
          <div class="lp-feat-icon" style="background:#fefce8;color:#ca8a04">📄</div>
          <h3>Instant Invoice</h3>
          <p>Get a print-ready invoice the moment your sale is confirmed.</p>
        </div>
        <div class="lp-feat-card">
          <div class="lp-feat-icon" style="background:#fdf4ff;color:#9333ea">🚀</div>
          <h3>Fast Process</h3>
          <p>From selection to sale in minutes. Simple, fast, and hassle-free.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED CARS -->
  <section class="lp-inventory" id="inventory">
    <div class="lp-inventory-inner">
      <div class="lp-inv-head">
        <div>
          <div class="lp-section-label">LATEST STOCK</div>
          <h2>Featured Vehicles</h2>
        </div>
        <button class="lp-btn-outline" (click)="go('/cars')">View all inventory →</button>
      </div>
      <div class="lp-car-grid">
        <article class="lp-car-card" *ngFor="let car of featured" (click)="go('/cars/'+car.id)">
          <div class="lp-car-img">
            <img [src]="car.imageUrl || fallback" [alt]="car.make+' '+car.model" (error)="imgErr($event)">
            <span class="lp-pill" [class.lp-sold]="car.status==='Sold'">{{car.status}}</span>
          </div>
          <div class="lp-car-body">
            <div class="lp-car-meta-top">{{car.stockNumber}} · {{car.year}} · {{car.color}}</div>
            <h3>{{car.make}} {{car.model}}</h3>
            <div class="lp-car-specs">
              <span>{{car.odometerKm | number}} km</span>
              <span class="lp-dot">·</span>
              <span>{{car.fuelType}}</span>
              <span class="lp-dot">·</span>
              <span>{{car.transmission}}</span>
            </div>
            <div class="lp-car-footer">
              <strong>{{car.price | currency:'INR':'symbol':'1.0-0'}}</strong>
              <span class="lp-view">View details →</span>
            </div>
          </div>
        </article>
      </div>
      <div class="lp-empty" *ngIf="!featured.length">Loading vehicles… make sure the backend is running.</div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="lp-cta">
    <div class="lp-cta-inner">
      <div>
        <h2>Ready to manage your dealership?</h2>
        <p>Access the full dealer dashboard to manage inventory, customers, sales and billing.</p>
      </div>
      <button class="lp-btn-primary lp-btn-lg" (click)="go('/dashboard')">Open Dashboard →</button>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="lp-footer" id="contact">
    <div class="lp-footer-inner">
      <div class="lp-footer-brand">
        <span class="lp-logo">A</span>
        <div>
          <strong>AutoHub</strong>
          <small>Used Car Sales Management</small>
        </div>
      </div>
      <div class="lp-footer-links">
        <span (click)="go('/cars')">Inventory</span>
        <span (click)="go('/customers')">Customers</span>
        <span (click)="go('/sales')">Sales</span>
        <span (click)="go('/billing')">Billing</span>
      </div>
      <div class="lp-footer-copy">Built with Angular · ASP.NET Core · SQL Server</div>
    </div>
  </footer>

</div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Manrope:wght@600;700;800&display=swap');
    .lp { font-family:'DM Sans',sans-serif; background:#fff; color:#1e293b; }

    /* NAV */
    .lp-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 60px; background:#0b1120; position:sticky; top:0; z-index:50; border-bottom:1px solid #1e2d45; }
    .lp-brand { display:flex; align-items:center; gap:10px; }
    .lp-logo { width:34px; height:34px; background:linear-gradient(135deg,#2563eb,#7c3aed); border-radius:9px; display:grid; place-items:center; color:white; font-family:'Manrope',sans-serif; font-size:17px; font-weight:800; flex-shrink:0; }
    .lp-brand-name { font-family:'Manrope',sans-serif; font-size:20px; font-weight:800; color:white; }
    .lp-brand-name span { color:#f59e0b; }
    .lp-nav-links { display:flex; gap:28px; }
    .lp-nav-links a { color:#64748b; font-size:13px; font-weight:500; cursor:pointer; transition:color .15s; }
    .lp-nav-links a:hover { color:white; }
    .lp-btn-primary { background:#2563eb; color:white; border:none; padding:9px 18px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; transition:background .15s; font-family:inherit; }
    .lp-btn-primary:hover { background:#1d4ed8; }
    .lp-btn-lg { padding:13px 24px; font-size:13px; }
    .lp-btn-ghost { background:transparent; color:#94a3b8; border:1px solid #1e3a5f; padding:13px 24px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; transition:all .15s; font-family:inherit; }
    .lp-btn-ghost:hover { background:#1e2d45; color:white; }
    .lp-btn-outline { background:transparent; color:#2563eb; border:1px solid #bfdbfe; padding:9px 18px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; transition:all .15s; font-family:inherit; }
    .lp-btn-outline:hover { background:#eff6ff; }

    /* HERO */
    .lp-hero { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; padding:80px 60px; background:linear-gradient(135deg,#0b1120 60%,#0f1e38); min-height:88vh; }
    .lp-badge { display:inline-flex; align-items:center; gap:7px; background:#1e2d45; color:#93c5fd; padding:7px 14px; border-radius:20px; font-size:11px; font-weight:600; margin-bottom:22px; border:1px solid #1e3a5f; }
    .lp-hero-left h1 { font-family:'Manrope',sans-serif; font-size:52px; font-weight:800; line-height:1.08; color:white; margin:0 0 20px; letter-spacing:-1px; }
    .lp-gold { color:#f59e0b; }
    .lp-hero-left p { color:#64748b; font-size:15px; line-height:1.75; margin:0 0 32px; max-width:460px; }
    .lp-hero-btns { display:flex; gap:12px; margin-bottom:40px; flex-wrap:wrap; }
    .lp-hero-stats { display:flex; align-items:center; gap:20px; }
    .lp-stat { display:flex; flex-direction:column; gap:3px; }
    .lp-stat-num { font-family:'Manrope',sans-serif; font-size:28px; font-weight:800; color:white; line-height:1; }
    .lp-stat-label { font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:1.2px; font-weight:600; }
    .lp-stat-div { width:1px; height:36px; background:#1e3a5f; }
    .lp-green { color:#34d399; }
    .lp-red { color:#f87171; }
    .lp-hero-img-wrap { position:relative; }
    .lp-hero-img-wrap img { width:100%; height:420px; object-fit:cover; border-radius:20px; box-shadow:0 40px 100px rgba(0,0,0,.5); display:block; }
    .lp-hero-badge-card { position:absolute; bottom:-16px; left:-16px; background:white; border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:10px; box-shadow:0 8px 32px rgba(0,0,0,.2); }
    .lp-hbc-icon { width:32px; height:32px; background:#f0fdf4; color:#16a34a; border-radius:8px; display:grid; place-items:center; font-size:16px; flex-shrink:0; }
    .lp-hero-badge-card strong { display:block; font-size:12px; color:#1e293b; font-weight:700; }
    .lp-hero-badge-card small { display:block; font-size:10px; color:#94a3b8; margin-top:2px; }

    /* FEATURES */
    .lp-features { background:#f8fafc; padding:80px 60px; }
    .lp-features-inner { max-width:1100px; margin:0 auto; }
    .lp-section-label { font-size:10px; font-weight:700; letter-spacing:2px; color:#2563eb; text-transform:uppercase; margin-bottom:10px; }
    .lp-features h2, .lp-inventory h2 { font-family:'Manrope',sans-serif; font-size:32px; font-weight:800; color:#0f172a; margin:0 0 40px; letter-spacing:-.5px; }
    .lp-feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
    .lp-feat-card { background:white; border:1px solid #e2e8f0; border-radius:14px; padding:24px; transition:transform .18s,box-shadow .18s; }
    .lp-feat-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,.08); }
    .lp-feat-icon { width:44px; height:44px; border-radius:12px; display:grid; place-items:center; font-size:20px; margin-bottom:16px; }
    .lp-feat-card h3 { font-family:'Manrope',sans-serif; font-size:14px; font-weight:800; margin:0 0 8px; color:#0f172a; }
    .lp-feat-card p { font-size:12px; color:#64748b; line-height:1.65; margin:0; }

    /* INVENTORY */
    .lp-inventory { padding:80px 60px; background:white; }
    .lp-inventory-inner { max-width:1200px; margin:0 auto; }
    .lp-inv-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; }
    .lp-car-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
    .lp-car-card { border:1px solid #e2e8f0; border-radius:14px; overflow:hidden; cursor:pointer; transition:transform .18s,box-shadow .18s; background:white; }
    .lp-car-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(0,0,0,.1); }
    .lp-car-img { height:170px; position:relative; background:#f1f5f9; }
    .lp-car-img img { width:100%; height:100%; object-fit:cover; display:block; }
    .lp-pill { position:absolute; top:10px; right:10px; background:#f0fdf4; color:#15803d; padding:4px 9px; border-radius:6px; font-size:9px; font-weight:700; }
    .lp-sold { background:#fef2f2; color:#dc2626; }
    .lp-car-body { padding:16px; }
    .lp-car-meta-top { font-size:9px; color:#94a3b8; font-weight:600; letter-spacing:.5px; text-transform:uppercase; margin-bottom:6px; }
    .lp-car-body h3 { font-family:'Manrope',sans-serif; font-size:14px; font-weight:800; margin:0 0 8px; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .lp-car-specs { font-size:11px; color:#94a3b8; display:flex; gap:5px; align-items:center; }
    .lp-dot { color:#cbd5e1; }
    .lp-car-footer { display:flex; align-items:center; justify-content:space-between; margin-top:14px; padding-top:12px; border-top:1px solid #f1f5f9; }
    .lp-car-footer strong { font-family:'Manrope',sans-serif; font-size:15px; font-weight:800; color:#0f172a; }
    .lp-view { font-size:10px; color:#2563eb; font-weight:600; }
    .lp-empty { text-align:center; padding:40px; color:#94a3b8; font-size:12px; }

    /* CTA */
    .lp-cta { background:linear-gradient(135deg,#1e3a8a,#4c1d95); padding:60px; }
    .lp-cta-inner { max-width:900px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; }
    .lp-cta h2 { font-family:'Manrope',sans-serif; font-size:26px; font-weight:800; color:white; margin:0 0 8px; }
    .lp-cta p { color:#93c5fd; font-size:13px; margin:0; }

    /* FOOTER */
    .lp-footer { background:#0b1120; padding:40px 60px; border-top:1px solid #1e2d45; }
    .lp-footer-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
    .lp-footer-brand { display:flex; align-items:center; gap:10px; }
    .lp-footer-brand strong { display:block; font-family:'Manrope',sans-serif; font-size:16px; color:white; font-weight:800; }
    .lp-footer-brand small { display:block; font-size:10px; color:#475569; margin-top:2px; }
    .lp-footer-links { display:flex; gap:24px; }
    .lp-footer-links span { color:#475569; font-size:12px; cursor:pointer; transition:color .15s; }
    .lp-footer-links span:hover { color:#94a3b8; }
    .lp-footer-copy { font-size:10px; color:#334155; }

    @media(max-width:1024px) { .lp-feat-grid,.lp-car-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:768px) {
      .lp-hero { grid-template-columns:1fr; padding:50px 24px; min-height:auto; }
      .lp-hero-right { display:none; }
      .lp-hero-left h1 { font-size:38px; }
      .lp-features,.lp-inventory,.lp-cta,.lp-footer { padding:50px 24px; }
      .lp-nav { padding:14px 24px; }
      .lp-nav-links { display:none; }
      .lp-cta-inner { flex-direction:column; text-align:center; }
      .lp-footer-inner { flex-direction:column; text-align:center; }
    }
    @media(max-width:480px) { .lp-feat-grid,.lp-car-grid { grid-template-columns:1fr; } }
  `]
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  featured: Car[] = [];
  total = 0; available = 0; sold = 0;
  fallback = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80';

  ngOnInit() {
    this.api.cars().subscribe(cars => {
      this.total = cars.length;
      this.available = cars.filter(c => c.status === 'Available').length;
      this.sold = cars.filter(c => c.status === 'Sold').length;
      this.featured = cars.slice(0, 4);
    });
  }

  go(path = '/dashboard') { this.router.navigateByUrl(path); }
  scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
  imgErr(e: Event) { (e.target as HTMLImageElement).src = this.fallback; }
}
