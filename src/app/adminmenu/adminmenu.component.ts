import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  templateUrl: './adminmenu.component.html',
  styleUrls: ['../shared/card.css','./adminmenu.component.css']
})
export class AdminmenuComponent implements OnInit {
  title: string = "Admin Menu";
  constructor(private router: Router,
              private route: ActivatedRoute) { }
  navigate(page:string): void {
    const username_hash = this.route.snapshot.paramMap.get('username');
    const password_hash = this.route.snapshot.paramMap.get('password');
    this.router.navigate([page,username_hash,password_hash]);
  }
  ngOnInit(): void {
  }
}
