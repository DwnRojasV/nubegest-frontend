import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface DisplayedColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnChanges {
  @Input() items: any[] = [];
  @Input() displayedColumns: DisplayedColumn[] = [];
  @Input() displayKeys: string[] = [];
  @Input() isLoading = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  //Table state
  searchControl = new FormControl('');
  filteredItems: any[] = [];
  displayedItems: any[] = [];

  //pagination
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  pageSizeOptions = [5, 10, 15];

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.setupSearch();
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = [...this.items];
      this.currentPage = 1;
      this.updatePagination();
    }
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filterItems(value || '');
      });
  }

  filterItems(term: string): void {
    if (!term.trim()) {
      this.filteredItems = [...this.items];
    } else {
      const lowerTerm = term.toLowerCase();
      this.filteredItems = this.items.filter((item) =>
        this.displayKeys.some((key) =>
          item[key]?.toString().toLowerCase().includes(lowerTerm)
        )
      );
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalItems = this.filteredItems.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedItems = this.filteredItems.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  formatValue(value: any): string {
    if (value instanceof Date) {
      return this.datePipe.transform(value, 'dd/MM/yyyy') ?? '';
    }

    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return this.datePipe.transform(new Date(value), 'dd/MM/yyyy') ?? '';
    }

    return value;
  }

  onPageSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(value);
    this.currentPage = 1;
    this.updatePagination();
  }

  getPaginationInfo(): string {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return `Mostrando ${startItem} a ${endItem} de ${this.totalItems} Elementos`;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
