export default function JobDetails(props) {
  const { job, className } = props;

  let experienceString = "";

  if (job.experience.min && job.experience.max) {
    experienceString = `Experience (${job.experience.min} - ${job.experience.max} years)`;
  } else if (job.experience.min && !job.experience.max) {
    experienceString = `Min Experience (${job.experience.min} years)`;
  } else if (!job.experience.min && job.experience.max) {
    experienceString = `Max Experience (${job.experience.max} years)`;
  }

  let salaryString = "";

  if (job.salary.min && job.salary.max) {
    salaryString = `INR (₹) ${job.salary.min} - ${job.salary.max} / Month`;
  } else if (job.salary.min && !job.salary.max) {
    salaryString = `INR (₹) ${job.salary.min} / Month`;
  } else if (!job.salary.min && job.salary.max) {
    salaryString = `INR (₹) ${job.salary.max} / Month`;
  }

  return (
    <div className={className}>
      <h1 className="text-2xl">{job.title}</h1>
      <div>
        <span>{job.companyName}</span>
        &nbsp;-&nbsp;
        <span>{job.industry}</span>
      </div>
      <div className="pb-4 text-placeholder">
        {job.location ? <span>{job.location}</span> : null}
        &nbsp;
        {job.remoteType ? <span>&#40;{job.remoteType}&#41;</span> : null}
      </div>
      <div className="pb-1">Part-Time (9.00 am - 5.00 pm IST)</div>
      {experienceString ? <div className="pb-1">{experienceString}</div> : null}
      {salaryString ? <div className="pb-1">{salaryString}</div> : null}
      {job.totalEmployee ? <div>{job.totalEmployee}&nbsp;employees</div> : null}
    </div>
  );
}
