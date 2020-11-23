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
  rowHeight?: number;
  draggableRows: DraggableRow[];
}

export interface DraggableRow {
  id: number;
  label: string;
  status: string;
  isDragging?: boolean;
  dragPosition: DragDropCoordinates;
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
