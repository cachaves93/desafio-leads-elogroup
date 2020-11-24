import { LeadStatusEnum } from '../enums/enum-bundle';

export interface DragDropTableParams {
  columnData: DragDropTableColumn[];
}

export interface DragDropTableColumn {
  name: string;
  status: string;
  unallowedStatus: string[];
}

export interface DragDropTableContent {
  hasPopover: boolean;
  popoverParams: PopoverParam[];
  rowHeight?: number;
  draggableRows: DraggableRow[];
}

export interface DraggableRow {
  id: number;
  label: string;
  status: string;
  hasLink: boolean;
  linkUrl?: string;
  isDragging?: boolean;
  hasDragged?: boolean;
  dragPosition: DragDropCoordinates;
  additionalData?: any;
}

export interface DragDropCoordinates {
  x: number;
  y: number;
}

export interface DragDropTableEvent {
  hasNotification: boolean;
  notification?: {
    type: string;
    message: string;
  };
}

export interface PopoverParam {
  label: string;
  property: string;
}
