"use client";
import Input from "../input";
import Radio from "../radio";
import {
  characterAndNumber,
  salaryNumber,
  onlyPositiveNumber,
} from "../../../utils/regex";

export default function StepTwoForm(props) {
  const { job, updateJobField, errorField } = props;

  const updateJobObjField = (objKey, key, value) => {
    const newObj = { ...job[objKey], [key]: value };

    updateJobField(objKey, newObj);
  };

  const handleRadioButtonChange = (radioKey, checked, value) => {
    if (checked) {
      updateJobField(radioKey, value);
    }
  };

  return (
    <form>
      <div className="mb-6">
        <label className="job-form-label">Experience</label>
        <div className="flex justify-between">
          <Input
            placeholder="Minimum"
            value={job.experience.min}
            pattern={onlyPositiveNumber}
            className="w-[48%]"
            onChange={(e) =>
              updateJobObjField("experience", "min", e.target.value)
            }
            error={errorField.field === "experience"}
          />
          <Input
            placeholder="Maximum"
            value={job.experience.max}
            pattern={onlyPositiveNumber}
            className="w-[48%]"
            onChange={(e) =>
              updateJobObjField("experience", "max", e.target.value)
            }
            error={errorField.field === "experience"}
          />
        </div>
        {errorField.field === "experience" ? (
          <div className="inputErrorMsg">{errorField.errorMessage}</div>
        ) : null}
      </div>
      <div className="mb-6">
        <label className="job-form-label">Salary</label>
        <div className="flex justify-between">
          <Input
            placeholder="Minimum"
            value={job.salary.min}
            pattern={salaryNumber}
            className="w-[48%]"
            onChange={(e) => updateJobObjField("salary", "min", e.target.value)}
            error={errorField.field === "salary"}
          />
          <Input
            placeholder="Maximum"
            value={job.salary.max}
            pattern={salaryNumber}
            className="w-[48%]"
            onChange={(e) => updateJobObjField("salary", "max", e.target.value)}
            error={errorField.field === "salary"}
          />
        </div>
        {errorField.field === "salary" ? (
          <div className="inputErrorMsg">{errorField.errorMessage}</div>
        ) : null}
      </div>
      <div className="mb-6">
        <label className="job-form-label">Total employee</label>
        <div>
          <Input
            placeholder="ex. 100"
            value={job.totalEmployee}
            pattern={characterAndNumber}
            onChange={(e) => updateJobField("totalEmployee", e.target.value)}
          />
        </div>
      </div>
      <fieldset>
        <label className="job-form-label">
          Apply type<span className="required">*</span>
        </label>
        <div className="flex">
          <div className="flex items-center mr-4">
            <Radio
              className="mr-1"
              checked={job.applyType === "quickApply"}
              onChange={(e) =>
                handleRadioButtonChange(
                  "applyType",
                  e.target.checked,
                  "quickApply"
                )
              }
            />
            <label className="text-sm text-placeholder">Quick apply</label>
          </div>
          <div className="flex items-center">
            <Radio
              className="mr-1"
              checked={job.applyType === "externalApply"}
              onChange={(e) =>
                handleRadioButtonChange(
                  "applyType",
                  e.target.checked,
                  "externalApply"
                )
              }
            />
            <label className="text-sm text-placeholder">External apply</label>
          </div>
        </div>
        {errorField.field === "applyType" ? (
          <div className="inputErrorMsg">{errorField.errorMessage}</div>
        ) : null}
      </fieldset>
    </form>
  );
}
