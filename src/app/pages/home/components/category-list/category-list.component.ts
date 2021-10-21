import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'phanolink-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.loadCategory()
  }

  loadCategory() {}

}
