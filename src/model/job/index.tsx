export default interface JobState {
    id?: number;
    nameJob ?: string;
    description ?: string;
    date ?:string;
    idEmployee ?: number;
    nameEmployee ?: string;
    avatar?: any;
    idProduct ?: number;
    nameProduct ?: string;
    quantityProduct ?: number;
    priceProduct ?: number;
    colorProduct ?: string;
    nameCustomer ?: string;
    customerPay ?: number;
    operation?: any;
}