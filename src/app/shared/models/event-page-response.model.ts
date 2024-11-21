import { EventDetailsResponse } from "./event-details-response.model";
import { PageableResponse } from "./pageable.response.model";

export type EventPageResponse = PageableResponse<EventDetailsResponse>;