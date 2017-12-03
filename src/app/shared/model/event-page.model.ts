import {Event} from "./event.model";

export class EventPage {
  content: Event[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: any[];
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
