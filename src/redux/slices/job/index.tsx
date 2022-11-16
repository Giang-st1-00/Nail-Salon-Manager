import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IJob} from '../../../model';
 
const initialState : Array<IJob> = [
    {
    id: 0, 
    nameJob: "nail polish", 
    description : "nail polish for customers",
    date : "6-10-2022", 

    idEmployee : 1,
    nameEmployee : "Tinh",

    idProduct: 1, 
    quantityProduct: 2, 
    priceProduct :  5,
    nameProduct : `Nail polish`,

    nameCustomer : "Messi",
    customerPay : 20,
    colorProduct : "blue",
    },
    {
      id: 1, 
      nameJob: "nailolish", 
      description : "nail polish for customers",
      date : "7-10-2022", 
  
      idEmployee : 1,
      nameEmployee : "Tinh",
  
      idProduct: 1, 
      quantityProduct: 2, 
      priceProduct :  3,
      nameProduct : `Nail polish`,
  
      nameCustomer : "Ronaldo",
      customerPay : 30,
      colorProduct : "red",
      },
      {
        id: 2, 
        nameJob: "nail polish", 
        description : "nail polish for customers",
        date : "6-10-2022", 
    
        idEmployee : 2,
        nameEmployee : "Giang",
    
        idProduct: 2, 
        quantityProduct: 2, 
        priceProduct :  4,
        nameProduct : 'Nail Polish',
    
        nameCustomer : "Neymar",
        customerPay : 40,
        colorProduct : "red",
        },
 ]

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    updateJob : (state ,action: PayloadAction<any>) => {
      state[action.payload.id] = action.payload;
    },
    removeJob : (state ,action: PayloadAction<any>) => {
      return state.filter((item,index) => item.id!=action.payload.id )
    }
  },
});

export const selectJob = (state : any) => {
  return state.job;
};

export const {updateJob,removeJob} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
