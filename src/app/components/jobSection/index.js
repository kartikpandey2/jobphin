"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { JobCardContainer, JobDetails, JobCardActions } from "../jobCard";
import { getAllJobs } from "../../jobs/api";
import CreateJob from "../createJob";
import JobEdit from "../jobEdit";
import JobDelete from "../jobDelete";
import ToastContext from "../toast/context";

export default function JobSection(props) {
  const { toast } = useContext(ToastContext);
  const [loading, updateLoading] = useState(true);
  const [allJobs, updateAllJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const allJobsLatest = await getAllJobs();

      updateAllJobs(allJobsLatest);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobsInitially = async () => {
    try {
      await fetchAllJobs();
      updateLoading(false);
    } catch (err) {
      toast("error", "Something went wrong while fetching jobs");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchJobsInitially, []);

  const onSuccess = (message) => {
    toast("success", message);

    fetchAllJobs();
  };

  const onError = (message) => {
    toast("error", message);
  };

  return (
    <>
      {loading ? <h1>Loading....</h1> : null}
      <header className="bg-white px-10 py-4">
        <CreateJob onJobPostSuccess={onSuccess} onError={onError} />
      </header>
      <section className="flex flex-wrap pl-10 pr-6 py-8 justify-between">
        {allJobs.map((job) => {
          return (
            <JobCardContainer
              key={job.id}
              className="w-full mb-4 lg:w-[48%] lg:mb-12"
            >
              <div className="text-end">
                <JobEdit
                  job={job}
                  onEditSuccess={onSuccess}
                  onError={onError}
                />
                <JobDelete
                  job={job}
                  onDeleteSucess={onSuccess}
                  onError={onError}
                />
              </div>
              <div className="flex relative -top-2">
                <div className="pr-2">
                  <Image
                    src="/jobIcon.png"
                    width={48}
                    height={48}
                    quality={100}
                    unoptimized={false}
                    alt="job icon"
                  />
                </div>
                <div>
                  <JobDetails className="pb-8" job={job} />
                  <JobCardActions job={job} />
                </div>
              </div>
            </JobCardContainer>
          );
        })}
      </section>
    </>
  );
}
