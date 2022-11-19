import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const jobListSelector = (state: RootState) => state.jobSlice.dataJob;
const filterJobSelector = (state : RootState) => state.jobSlice.filter;
const remainingJob = createSelector(
  jobListSelector,
  filterJobSelector,
  (jobList,  filter) => {
    const remainingJob = jobList.filter((job) => {
      let isCheckDate = true;
      if (filter.date[0] && filter.date[1]) {
        const endDate = new Date(filter.date[1]);
        const startDate = new Date(filter.date[0]);
        if (!(job.time > startDate && job.time < endDate)) 
          isCheckDate = false;
      }
      return job.nameJob.includes(filter.name) && isCheckDate;
    })
    return remainingJob;
  }
);

export default remainingJob;
