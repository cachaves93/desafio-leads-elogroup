// Angular and Rxjs
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
// Models
import { DragDropTableColumn,
         DragDropTableContent,
         DragDropTableEvent,
         DragDropTableParams,
         DraggableRow } from '../../models/drag-drop-table.model';
import { LeadModel } from '../../models/leads.model';
import { UpdateLeadsRequest } from '../../models/requests.model';

@Component({
  selector: 'app-drag-drop-table',
  templateUrl: 'drag-drop-table.component.html',
  styleUrls: ['drag-drop-table.component.scss']
})
export class DragDropTableComponent implements OnInit {

  @Input() dragDropTableParams: DragDropTableParams;
  @Input() dragDropTableContent: DragDropTableContent;
  @Input() updateStatus$: (updateRequest: UpdateLeadsRequest) => Observable<any>;

  @Output() emitNotification: EventEmitter<DragDropTableEvent> = new EventEmitter();

  @ViewChild('tableElement')
  tableElement: ElementRef;

  private columnsNumber: number;
  public columnWidthPercentage: number;
  private clickSuppressed: boolean;

  private endDragSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.columnsNumber = this.dragDropTableParams.columnData.length;
    this.columnWidthPercentage = 100 / this.columnsNumber;
  }

  handleDragStart(
    event: CdkDragStart,
    rowIndex: number,
    currentRowStatus: string
  ): void {

    this.clickSuppressed = true;
    this.dragDropTableContent.draggableRows[rowIndex].isDragging = true;
    this.dragDropTableContent.draggableRows[rowIndex].hasDragged = true;

    this.endDragSubscription = event.source.ended.subscribe(
      (dragEnd: CdkDragEnd) => {

        this.endDragSubscription.unsubscribe();

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
          this.unsuppressClick();
          return this.resetDragXPosition(rowIndex);
        }

        const dragEndPreviousStatus: string =
        this.dragDropTableParams.columnData[currentColumnIndex].status;

        const dragEndColumnStatus: string =
        this.dragDropTableParams.columnData[currentColumnIndex + columnsRoamedOnDragEnd].status;

        const validChange: boolean = this.validateDragStatusChange(
          currentColumnIndex,
          dragEndColumnStatus,
        );

        validChange
        ? this.handleValidChange(
          rowIndex, dragEndColumnStatus, dragEndPreviousStatus
        )
        : this.handleInvalidChange(rowIndex);

        this.unsuppressClick();

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
    dragEndPreviousStatus: string,
  ): void {

    this.dragDropTableContent.draggableRows[rowIndex]
    .status = dragEndColumnStatus;


    const updateRequest: UpdateLeadsRequest = this.buildUpdateRequest();

    this.updateStatus$(
      updateRequest
    ).subscribe(
      (res: any) => {
        this.emitNotification.emit({
          hasNotification: true,
          notification: {
            type: 'success',
            message: res.message,
          }
        });
      },
      (err: HttpErrorResponse) => {
        this.dragDropTableContent.draggableRows[rowIndex]
        .status = dragEndPreviousStatus;
      }
    );

  }

  handleInvalidChange(rowIndex: number): void {

    this.resetDragXPosition(rowIndex);

    this.emitNotification.emit({
      hasNotification: true,
      notification: {
        type: 'warning',
        message: 'Essa alteração de status é inválida!'
      }
    });
  }

  buildUpdateRequest(): UpdateLeadsRequest {

    const leadsList: LeadModel[] =
     this.dragDropTableContent.draggableRows.map(
      (row: DraggableRow) => {
        return {
          id: row.id,
          name: row.label,
          status: row.status,
          phone: row.additionalData?.phone,
          email: row.additionalData?.email,
          opportunities: row.additionalData?.opportunities,
        } as LeadModel;
      }
    );

    return { requestType: 'update-leads', leadsList } as UpdateLeadsRequest;
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

  unsuppressClick(): void {
    setTimeout(
      () => {this.clickSuppressed = false; }, 200
    );
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

  // --------------------------------- Redirects -----------------------------------------

  attemptRedirect(draggableRow: DraggableRow): void {
    if (!this.clickSuppressed) {
      this.router.navigate([draggableRow.linkUrl]);
    }
  }

  // -------------------------------------------------------------------------------------

  // ----------------------------- Popover functions  ------------------------------------

  openPopover(
    popoverReference: NgbPopover,
    draggableRowData: DraggableRow
  ): void {
    if (!draggableRowData.hasDragged) {
      popoverReference.open({data: draggableRowData});
    }
  }

  closePopover(
    popoverReference: NgbPopover
  ): void {
    popoverReference.close();
  }

  // ------------------------------------------------------------------------------------

  // ------------------------------- Enum Handler ---------------------------------------

  isArray(value: any): boolean {
    return Array.isArray(value) ? true : false;
  }

  enumArrayHandler(array: string[]): string[] {

    return array.length > 0
    ? array.map( item => item.replace('_', ' ').toUpperCase() )
    : undefined;
  }

  // ------------------------------------------------------------------------------------

}
