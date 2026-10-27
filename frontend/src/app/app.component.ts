import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <ng-container *ngIf="onHome; else shell">
      <router-outlet />
    </ng-container>
    <ng-template #shell>
      <div class="app-shell">
        <aside class="sidebar">
          <a class="brand" routerLink="/dashboard">
            <span class="brand-icon">A</span>
            <span class="brand-text">
              <strong>AutoHub</strong>
              <small>USED CAR MANAGEMENT</small>
            </span>
          </a>
          <div class="nav-section">
            <div class="nav-label">Main Menu</div>
            <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">
              <span class="nav-icon">⊞</span><span>Overview</span>
            </a>
            <a routerLink="/cars" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🚘</span><span>Car Inventory</span>
            </a>
            <a routerLink="/customers" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">👤</span><span>Customers</span>
            </a>
            <a routerLink="/sales" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">📈</span><span>Sales</span>
            </a>
            <a routerLink="/billing" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🧾</span><span>Billing</span>
            </a>
          </div>
          <hr class="sidebar-divider">
          <div class="nav-section">
            <div class="nav-label">Public</div>
            <a routerLink="/" class="nav-link">
              <span class="nav-icon">🌐</span><span>Home Page</span>
            </a>
          </div>
          <div class="sidebar-bottom">
            <div class="avatar">AD</div>
            <div>
              <strong>Administrator</strong>
              <small>Sales Manager</small>
            </div>
            <span class="online-dot"></span>
          </div>
        </aside>
        <main class="main-area">
          <header class="topbar">
            <div><span class="breadcrumb">AutoHub / </span><strong>{{pageTitle}}</strong></div>
            <div class="top-right">
              <div class="api-badge"><span class="api-dot"></span> API Connected</div>
              <div class="top-avatar">AD</div>
            </div>
          </header>
          <div class="page-content">
            <router-outlet />
          </div>
          <footer>
            <span>AutoHub · Used Car Sales Management</span>
            <span>Angular 18 · ASP.NET Core 8 · SQL Server</span>
          </footer>
        </main>
      </div>
    </ng-template>
  `
})
export class AppComponent implements OnInit {
  onHome = true;
  pageTitle = 'Dashboard';

  private pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/cars': 'Car Inventory',
    '/customers': 'Customers',
    '/sales': 'Sales',
    '/billing': 'Billing',
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url: string = e.urlAfterRedirects;
      this.onHome = url === '/' || url === '/home';
      this.pageTitle = this.pageTitles[url] ?? (url.startsWith('/cars/') ? 'Car Profile' : 'AutoHub');
    });
  }
}
