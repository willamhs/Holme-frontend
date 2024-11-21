export interface InscriptionResponse {
    //Datos según el DTO
    id: number;
    inscriptionStatus: InscriptionStatus;
    customerName: string;
    total: number;
    createdAt: string;
    //paymentStatus: PaymentStatus;
    items: InscriptionItemResponse[];

  }
  
  
  export enum InscriptionStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
  }
  
  
  export interface InscriptionItemResponse {
    //Datos según el DTO
    eventId: number;
    price: number;
    nameEvent: string;
    quantity: number;
  }
  