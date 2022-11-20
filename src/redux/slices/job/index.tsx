import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Avatar } from 'antd';
import {IFilter, IJob} from '../../../model';
import {
  UserOutlined,
} from "@ant-design/icons";
import remainingUser from '../../selectors/user';
import { useSelector } from 'react-redux';


type JobState = {
  filter: {
    name: string;
    date: Array<string>;
  };
  dataJob : Array<IJob>;
};

const initialState : JobState = {
    filter: {
      name: "",
      date: ["", ""],
    },
    dataJob : [
      {
        key: '0', 
        nameJob: "nail polish", 
        description : "nail polish for customers",
        time : new Date("2022-03-25"), 

        idEmployee : '1',
        nameEmployee : "Tinh",

        idProduct: '1', 
        quantityProduct: 2, 
        priceProduct :  5,
        nameProduct : `Bấm móng tay`,

        nameCustomer : "Messi",
        customerPay : 20,
        colorProduct : "blue",
      },
      {
        key : '1', 
        nameJob: "nailolish", 
        description : "nail polish for customers",
        time : new Date("2022-01-25"), 
    
        idEmployee : '1',
        nameEmployee : "Tinh",
    
        idProduct: '1', 
        quantityProduct: 2, 
        priceProduct :  3,
        nameProduct : `Bấm móng chân`,
    
        nameCustomer : "Ronaldo",
        customerPay : 30,
        colorProduct : "red",
      },
      {
        key : '3', 
        nameJob: "nail polish", 
        description : "nail polish for customers",
        time : new Date("2022-01-25"), 
    
        idEmployee : '2',
        nameEmployee : "Giang",
    
        idProduct: '2', 
        quantityProduct: 2, 
        priceProduct :  4,
        nameProduct : 'Bấm móng chân',
    
        nameCustomer : "Neymar",
        customerPay : 40,
        colorProduct : "red",
      }
    ]
  }

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<IJob>) => {
      state.dataJob.push(action.payload);
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.dataJob = state.dataJob.filter(
        (job) => job.key !== action.payload
      );
    },
    deleteListJob: (state, action: PayloadAction<React.Key[]>) => {
      state.dataJob = state.dataJob.filter(
        (job) => !action.payload.includes(job.key)
      );
    },

    editJob: (state, action: PayloadAction<IJob>) => {
      const indexEditJob = state.dataJob.findIndex(
        (job) => job.key === action.payload.key
        );

      state.dataJob[indexEditJob] = action.payload;
    },
    changeStatus: (state, action: PayloadAction<IFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers : (builder) => {
    builder
      .addCase('editJob', (state) => {
        console.log(state);
        
      })
  }
});

export const { addJob, deleteJob, deleteListJob, editJob, changeStatus } =
  jobSlice.actions;
// Export reducer
export default jobSlice.reducer;
