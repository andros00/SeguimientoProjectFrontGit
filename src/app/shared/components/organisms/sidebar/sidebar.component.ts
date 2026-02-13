import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSmallScreen = false;
  drawerOpened = false;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.isSmallScreen = result.matches;
      if (this.isSmallScreen) {
        this.drawerOpened = false;
      } else {
        this.drawerOpened = true;
      }
    });
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }
}
