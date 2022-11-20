export interface IJob {
    key : string;
    nameJob : string;
    description ?: string;
    time : Date | string;
    idEmployee : string;
    nameEmployee : string;
    idProduct : string;
    nameProduct : string;
    quantityProduct : number;
    priceProduct : number;
    colorProduct : string;
    nameCustomer : string;
    customerPay : number;
}