import { getAllJobs } from "./jobs/api";
import JobSection from "./components/jobSection";

export default async function Home() {
  const jobsData = await getAllJobs();

  return (
    <div className="bg-background-gray w-full h-full">
      <JobSection jobs={jobsData} />
    </div>
  );
}
