import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const jobListSelector = (state: RootState) => state.job;
const searchSelector = (state: RootState) => state.search;

export const remainingJob = createSelector(
  jobListSelector,
  searchSelector,
  (jobList,  value : any) => {
    let newValue: any = [];
    if (value.valueSearch == "" && value.valueDate == "") {
      return jobList;
    }
    if (value.valueSearch == "" && value.valueDate != "") {
      jobList.map((job : any) => {
        
    })
      return jobList;
    }
    jobList.map((job : any) => {
        if (job.nameJob?.includes(value.valueSearch)) {
          newValue.push(job);
        }
    })
    return newValue;
  }
);

