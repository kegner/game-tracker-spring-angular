import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'tfoot[app-table-footer]',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.css']
})
export class TableFooterComponent implements OnInit {

  @Input() gamesPages!: Array<Array<Game>>;
  @Input() pageIndex!: number;
  @Input() itemsPerPage!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageButtonHandler(index: number) {
    this.pageChange.emit(index);
  }

}
