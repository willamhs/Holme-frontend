export interface PaypalOrderResponse {
    paypalUrl: string;
  }
  
  
  export interface PaypalCaptureResponse {
    completed: boolean;
    inscriptionId: number;
  }
  