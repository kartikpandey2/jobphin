import axios from "axios";
import config from "@/config";

export const getAllJobs = async () => {
  try {
    const url = `${config.jobBaseURL}/`;

    const allJobsResponse = await axios.get(url);

    return allJobsResponse.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const postJob = async (jobData) => {
  try {
    const url = `${config.jobBaseURL}/`;

    const postJobResponse = await axios.post(url, jobData);

    return postJobResponse.data;
  } catch (err) {
    console.error(err);

    return Promise.reject(err);
  }
};

export const updateJob = async (jobId, updateJobData) => {
  try {
    const url = `${config.jobBaseURL}/${jobId}`;

    const updateJobResponse = await axios.put(url, updateJobData);

    return updateJobResponse.data;
  } catch (err) {
    console.error(err);

    return Promise.reject(err);
  }
};

export const deleteJob = async (jobId) => {
  try {
    const url = `${config.jobBaseURL}/${jobId}`;

    const deleteJobResponse = await axios.delete(url);

    return deleteJobResponse.data;
  } catch (err) {
    console.error(err);

    return Promise.reject(err);
  }
};
