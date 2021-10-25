import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '@pages/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { AdminFormComponent } from '@pages/admin/components/admin-form/admin-form.component';

@Component({
  selector: 'phanolink-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
})
export class AdminTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'title',
    'image',
    'price',
    'discount',
    'quantity',
    'description',
    'status',
  ];
  dataSource = new MatTableDataSource();
  refreshData = new BehaviorSubject<boolean>(true);

  constructor(private readonly adminService: AdminService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadProduct() {
    this.refreshData
      .pipe(switchMap((_) => this.adminService.getProduct()))
      .subscribe((response) => {
        // @ts-ignore
        this.dataSource.data = response.body.data;
      });
  }

  openCreateForm() {
    this.dialog
      .open(AdminFormComponent, {
        width: '700px',
        autoFocus: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.refreshData.next(true);
      });
  }

  filterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(val: any) {
    this.dialog
      .open(AdminFormComponent, {
        width: '700px',
        autoFocus: true,
        data: {
          productDetail: val,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.refreshData.next(true);
      });
  }
}
