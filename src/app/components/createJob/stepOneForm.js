"use client";
import Input from "../input";
import { onlyCharacter } from "../../../utils/regex";

export default function StepOneForm(props) {
  const { job, updateJobField, errorField } = props;

  return (
    <form>
      <div className="mb-6">
        <label className="job-form-label">
          Job title<span className="required">*</span>
        </label>
        <div>
          <Input
            placeholder="ex. UX UI Designer"
            value={job.title}
            pattern={onlyCharacter}
            onChange={(e) => updateJobField("title", e.target.value)}
            error={errorField.field === "title"}
            errorMsg={errorField.errorMessage}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="job-form-label">
          Company Name<span className="required">*</span>
        </label>
        <div>
          <Input
            placeholder="ex. Google"
            value={job.companyName}
            pattern={onlyCharacter}
            onChange={(e) => updateJobField("companyName", e.target.value)}
            error={errorField.field === "companyName"}
            errorMsg={errorField.errorMessage}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="job-form-label">
          Industry<span className="required">*</span>
        </label>
        <div>
          <Input
            placeholder="ex. Information Technology"
            value={job.industry}
            pattern={onlyCharacter}
            onChange={(e) => updateJobField("industry", e.target.value)}
            error={errorField.field === "industry"}
            errorMsg={errorField.errorMessage}
          />
        </div>
      </div>
      <div className="flex justify-between mb-6">
        <div className="w-[48%]">
          <label className="job-form-label">Location</label>
          <div>
            <Input
              placeholder="ex. Chennai"
              value={job.location}
              pattern={onlyCharacter}
              onChange={(e) => updateJobField("location", e.target.value)}
              error={errorField.field === "location"}
              errorMsg={errorField.errorMessage}
            />
          </div>
        </div>
        <div className="w-[48%]">
          <label className="job-form-label">Remote Type</label>
          <div>
            <Input
              placeholder="ex. In-office"
              value={job.remoteType}
              pattern={onlyCharacter}
              onChange={(e) => updateJobField("remoteType", e.target.value)}
              error={errorField.field === "remoteType"}
              errorMsg={errorField.errorMessage}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
