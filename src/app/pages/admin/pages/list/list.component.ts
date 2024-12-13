import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { IPageStatus } from '../IPageStatus';
import { EditComponent } from '../edit/edit.component';

import { ApiService } from '../../../../core/services/common/api/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @ViewChild(EditComponent) editComponent!: EditComponent

  number: number = 1;
  size: number = 4;
  isFirst: boolean = true;
  isLast: boolean = false;

  first: number = (this.number - 1) * this.size;
  last: number = this.number * this.size;
  totalRecords: number = 0;
  totalPages: number = 1;

  pages: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadPages();
  }

  openModal(): void {
    this.editComponent.open();
  }

  loadPages(): void {
    let params = new HttpParams()
      .set('pageNumber', this.number)
      .set('pageSize', this.size)
      .set('ascending', false);

    this.apiService.get<any[]>(`cms/pages/get`, params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isFirst = !response.data.hasPreviousPage;
        this.isLast = !response.data.hasNextPage;

        this.totalRecords = response.data.totalCount;
        this.totalPages = response.data.totalPages;

        this.pages = response.data.items;
        // console.log(this.pages);
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load pages';
        console.error('Error loading pages:', error);
      },
    });
  }

  prev(): void {}
  next(): void {}

  isFirstPage(): boolean {
    return this.isFirst;
  }

  isLastPage(): boolean {
    return this.isLast;
  }

  reset(): void {}

  pageChange(event: any) {
    // console.log(`page change`, event);
  }

  loadPagesLazy(event: any): void {
    if (this.first == event.first) return;

    this.first = event.first;
    this.number = event.first / event.rows + 1;
    this.loadPages();
  }

  formatSlug(slug: string): string {
    return slug === 'home' ? '/' : `/${slug}`;
  }

  getStatusName(status: IPageStatus): string {
    let result = '';
    switch (status.id) {
      case 1:
        result = 'Entwurf';
        break;
      case 2:
        result = 'Veröffentlicht';
        break;
    }
    return result;
  }
}
