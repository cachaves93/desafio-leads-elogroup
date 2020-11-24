// Angular and Rxjs
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// Models
import { DragDropTableContent, DragDropTableEvent, DragDropTableParams, DraggableRow } from 'src/app/shared/models/drag-drop-table.model';
import { LeadsListRequest } from 'src/app/shared/models/requests.model';
import { LeadsListResponseData } from 'src/app/shared/models/responses.model';
// Enums
import { ButtonSizeEnum, LeadStatusEnum } from 'src/app/shared/enums/enum-bundle';
// Services
import { LeadsService } from '../services/leads-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'leads-panel.component.html',
})
export class LeadsPanelComponent implements OnInit, OnDestroy {

  // View Params
  public newLeadButtonSize: ButtonSizeEnum = ButtonSizeEnum.BIG;
  public hasNotification: boolean = false;
  public notificationType: string;
  public notificationMessage: string;

  // Page Request Params
  private leadsListRequest: LeadsListRequest = { requestType: 'list-leads' };
  private getLeadsListSubscription = Subscription.EMPTY;

  // Drag Drop Table related content
  public dragDropTableParams: DragDropTableParams = {
      columnData: [
        {
          name: 'Clientes Em Potencial',
          status: LeadStatusEnum.CLIENTE_EM_POTENCIAL.toString(),
          unallowedStatus: [ LeadStatusEnum.REUNIAO_AGENDADA ]
        },
        {
          name: 'Dados Confirmados',
          status: LeadStatusEnum.DADOS_CONFIRMADOS.toString(),
          unallowedStatus: [ LeadStatusEnum.CLIENTE_EM_POTENCIAL ]
        },
        {
          name: 'Reunião Agendada',
          status: LeadStatusEnum.REUNIAO_AGENDADA.toString(),
          unallowedStatus: [
            LeadStatusEnum.CLIENTE_EM_POTENCIAL,
            LeadStatusEnum.DADOS_CONFIRMADOS
          ]
        }
      ]
    };
  public dragDropTableContent: DragDropTableContent;

  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
  ) {}

  // ------------- Liifecycle functions ------------------------------

  ngOnInit(): void {

    this.getLeadsListSubscription = this.leadsService.getLeadsList(
      this.leadsListRequest
    ).subscribe(
      (res: LeadsListResponseData[]) => {
        this.dragDropTableContent = this.handleLeadsResponseData(res);
      },
      (err: HttpErrorResponse) => {},
      () => { this.getLeadsListSubscription.unsubscribe(); }
    );

  }

  ngOnDestroy(): void {
    this.getLeadsListSubscription.unsubscribe();
  }

  // ---------------------------------------------------------------------

  handleLeadsResponseData(
    responseData: LeadsListResponseData[]
  ): DragDropTableContent {

    const draggableRows: DraggableRow[] = responseData.map(
      (data: LeadsListResponseData): DraggableRow => {
        return {
          id: data.id,
          label: data.name,
          status: data.status,
        } as DraggableRow;
      }
    );

    const dragDropTableContent: DragDropTableContent = {
      hasPopover: true,
      draggableRows,
    };

    return dragDropTableContent;
  }

  handleOpenModalNewLead(templateRef: any): void {
    this.modalService.open(templateRef, {
      centered: true,
      keyboard: true,
      scrollable: true,
      size: 'lg'
    });
  }

  handleNotification(event: DragDropTableEvent): void {
    this.hasNotification = event.hasNotification;
    this.notificationType = event.notification?.type;
    this.notificationMessage = event.notification?.message;
  }

  handleCloseAlert(): void {
    this.hasNotification = false;
  }

}
