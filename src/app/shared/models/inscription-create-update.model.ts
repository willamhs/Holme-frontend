export interface InscriptionCreateUpdateRequest {
    customerId: number;
    total: number;
    items: InscriptionItemCreateUpdateRequest[];
  }
  
  
  export interface InscriptionItemCreateUpdateRequest {
    eventId: number;
    nameEvent: String;
    quantity: number; 
    price: number;
  }
  