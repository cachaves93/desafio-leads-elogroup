// Angular and Rxjs
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// Models
import { DragDropTableContent, DragDropTableEvent, DragDropTableParams, DraggableRow } from 'src/app/shared/models/drag-drop-table.model';
import { LeadsListRequest, UpdateLeadsRequest } from 'src/app/shared/models/requests.model';
// Enums
import { ButtonSizeEnum, LeadStatusEnum } from 'src/app/shared/enums/enum-bundle';
// Services
import { LeadsService } from '../services/leads-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LeadModel } from 'src/app/shared/models/leads.model';

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

  // Modal
  private modalRef: NgbModalRef;
  private modalSubscription: Subscription = Subscription.EMPTY;

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

  public updateLeads: (request: UpdateLeadsRequest) => Observable<any>;

  constructor(
    private leadsService: LeadsService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
  ) {}

  // ------------- Liifecycle functions ------------------------------

  ngOnInit(): void {

    this.updateLeads = this.leadsService.updateLeadsList;

    this.getLeadsListSubscription = this.leadsService.getLeadsList(
      this.leadsListRequest
    ).subscribe(
      (res: LeadModel[]) => {
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
    responseData: LeadModel[]
  ): DragDropTableContent {

    const draggableRows: DraggableRow[] = responseData.map(
      (data: LeadModel): DraggableRow => {
        return {
          id: data.id,
          label: data.name,
          status: data.status,
          hasLink: true,
          linkUrl: `/features/leads/leads-details/${data.id}`,
          additionalData: {
            phone: data.phone,
            email: data.email,
            opportunities: data.opportunities
          }
        } as DraggableRow;
      }
    );

    const dragDropTableContent: DragDropTableContent = {
      hasPopover: true,
      popoverParams: [
        { label: 'Telefone', property: 'phone' },
        { label: 'E-mail', property: 'email' },
        { label: 'Oportunidades', property: 'opportunities' }
      ],
      draggableRows,
    };

    return dragDropTableContent;
  }

  handleOpenModalNewLead(templateRef: any): void {

    this.modalRef = this.modalService.open(templateRef, {
      centered: true,
      keyboard: true,
      scrollable: true,
      size: 'lg',
      windowClass: 'modal-width'
    });

    this.modalRef.closed.subscribe(
        () => {
          this.modalSubscription.unsubscribe();
          this.ngOnInit();
        }
    );
  }

  handleCloseModal(isClose: boolean): void {
    if (isClose) this.modalRef.close();
  }

  handleNotification(event: DragDropTableEvent): void {
    this.hasNotification = event.hasNotification;
    this.notificationType = event.notification?.type;
    this.notificationMessage = event.notification?.message;
  }

  handleCloseAlert(): void {
    this.hasNotification = false;
  }

  resetLeadStorage(): void {
    this.localStorageService.resetLeadsStorage();
    window.location.reload();
  }

}
