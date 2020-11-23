// Angular and Rxjs
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Models
import { DragDropTableColumn,
         DragDropTableContent,
         DragDropTableEvent,
         DragDropTableParams,
         DraggableRow } from '../../models/drag-drop-table.model';

@Component({
  selector: 'app-drag-drop-table',
  templateUrl: 'drag-drop-table.component.html',
  styleUrls: ['drag-drop-table.component.scss']
})
export class DragDropTableComponent implements OnInit {

  @Input() dragDropTableParams: DragDropTableParams;
  @Input() dragDropTableContent: DragDropTableContent;

  @Output() emitNotification: EventEmitter<DragDropTableEvent> = new EventEmitter();

  @ViewChild('tableElement')
  tableElement: ElementRef;

  private columnsNumber: number;
  public columnWidthPercentage: number;

  private testSubscription: Subscription = Subscription.EMPTY;

  constructor() {}

  ngOnInit(): void {
    this.columnsNumber = this.dragDropTableParams.columnData.length;
    this.columnWidthPercentage = 100 / this.columnsNumber;
  }

  handleDragStart(
    event: CdkDragStart,
    rowIndex: number,
    currentRowStatus: string
  ): void {

    this.dragDropTableContent.draggableRows[rowIndex].isDragging = true;


    this.testSubscription = event.source.ended.subscribe(
      (dragEnd: CdkDragEnd) => {

        this.testSubscription.unsubscribe();

        this.endRowDragging(rowIndex);

        // No sufficient API on browsers or Angular that permits resize
        // observing on element level (Renderer2 does not support resize)
        // Most performance friendly method seems to be reevaluating
        // column container width on every drag end in order to keep
        // table responsive.

        const tableWidth: number = this.tableElement.nativeElement.offsetWidth;

        const dragContainerWidth: number = tableWidth / this.columnsNumber;

        const currentColumnIndex = this.dragDropTableParams.columnData.findIndex(
          (columnData: DragDropTableColumn) => columnData.status === currentRowStatus
        );

        const xPosition = dragEnd.distance.x;

        const columnsRoamedOnDragEnd: number = Math.round(xPosition / dragContainerWidth);

        if (columnsRoamedOnDragEnd === 0) {
          this.resetNotification();
          return this.resetDragXPosition(rowIndex);
        }

        const dragEndColumnStatus: string =
        this.dragDropTableParams.columnData[currentColumnIndex + columnsRoamedOnDragEnd].status;

        const validChange: boolean = this.validateDragStatusChange(
          currentColumnIndex,
          dragEndColumnStatus
        );

        validChange
        ? this.handleValidChange(rowIndex, dragEndColumnStatus)
        : this.handleInvalidChange(rowIndex);


      }
    );
  }


  // ----------------- Dragging Control Functions ----------------------------

  validateDragStatusChange(
    currentColumnIndex: number,
    dragEndColumnStatus: string,
  ): boolean {
    return this.dragDropTableParams.columnData[currentColumnIndex]
    .unallowedStatus.indexOf(dragEndColumnStatus) === -1
    ? true
    : false;
  }

  handleValidChange(
    rowIndex: number,
    dragEndColumnStatus: string,
  ): void {

    this.dragDropTableContent.draggableRows[rowIndex].status = dragEndColumnStatus;

    this.emitNotification.emit({
      hasNotification: true,
      notification: {
        type: 'success',
        message: 'Alteração realizada com sucesso'
      }
    });
  }

  handleInvalidChange(rowIndex: number): void {

    this.endRowDragging(rowIndex);
    this.resetDragXPosition(rowIndex);

    this.emitNotification.emit({
      hasNotification: true,
      notification: {
        type: 'warning',
        message: 'Essa alteração de status é inválida!'
      }
    });
  }


  endRowDragging(rowIndex: number): void {
    this.dragDropTableContent.draggableRows[rowIndex].isDragging = false;
  }

  resetDragXPosition(rowIndex: number): void {
    this.dragDropTableContent.draggableRows[rowIndex].dragPosition = {
      x: 0,
      y: 0,
    };
  }

  // -------------------------------------------------------------------------

  // ----------------- Table Class Control Functions ----------------------------

  calcDragAreaClass(
    draggableRow: DraggableRow,
    columnData: DragDropTableColumn
  ): string {

    const isChangeableClass: boolean = this.checkChangeableClass(
      draggableRow, columnData.status
      );

    if (!isChangeableClass) return null;

    let returnClass: string;

    const currentColumnData = this.dragDropTableParams.columnData.find(
      (value: DragDropTableColumn) => value.status === draggableRow.status
    );

    currentColumnData.unallowedStatus.indexOf(
      columnData.status
    ) !== -1
    ? returnClass = 'background-red'
    : returnClass = 'background-green';

    return returnClass;

  }

  checkChangeableClass(
    draggableRow: DraggableRow,
    nonChangeableStatus: string
  ): boolean {
    if (!draggableRow.isDragging
      || draggableRow.status === nonChangeableStatus
    ) { return false; }

    return true;
  }

  resetNotification(): void {
    this.emitNotification.emit({
      hasNotification: false,
    });
  }

  // -------------------------------------------------------------------------

}
