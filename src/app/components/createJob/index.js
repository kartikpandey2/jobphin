"use client";
import { useState } from "react";
import Modal from "../modal";
import Button from "../button";
import StepOneForm from "./stepOneForm";
import StepTwoForm from "./stepTwoForm";
import { postJob } from "../../jobs/api";

const jobInit = {
  title: "",
  companyName: "",
  industry: "",
  location: "",
  remoteType: "",
  experience: { min: "", max: "" },
  salary: { min: "", max: "" },
  totalEmployee: null,
  applyType: "",
};

const errorFieldInit = {
  field: "",
  errorMessage: "",
};

export default function CreateJob(props) {
  const [showModal, updateShowModal] = useState(false);
  const [currentStep, updateStep] = useState(1);
  const [newJob, updateNewJob] = useState(jobInit);
  const [errorField, updateErrorField] = useState(errorFieldInit);

  const handleCloseModal = () => {
    updateShowModal(false);
    updateNewJob(jobInit);

    if (currentStep > 1) {
      updateStep(1);
    }
  };

  const handleButtonClick = async () => {
    if (currentStep === 1) {
      //validate data and push next step

      if (!newJob.title) {
        const inputError = {
          field: "title",
          errorMessage: "Job title is required",
        };

        return updateErrorField(inputError);
      }

      if (!newJob.companyName) {
        const inputError = {
          field: "companyName",
          errorMessage: "Company name is required",
        };

        return updateErrorField(inputError);
      }

      if (!newJob.industry) {
        const inputError = {
          field: "industry",
          errorMessage: "Industry is required",
        };

        return updateErrorField(inputError);
      }

      updateStep(currentStep + 1);
    }

    if (currentStep === 2) {
      // validate data and submit

      const minExperience = parseInt(newJob.experience.min);
      const maxExperience = parseInt(newJob.experience.max);

      if (minExperience > maxExperience) {
        const inputError = {
          field: "experience",
          errorMessage: "Min experience cannot be greater than max experience",
        };

        return updateErrorField(inputError);
      }

      const minSalary = parseInt(newJob.salary.min);
      const maxSalary = parseInt(newJob.salary.max);

      if (minSalary > maxSalary) {
        const inputError = {
          field: "salary",
          errorMessage: "Min salary cannot be greater than max salary",
        };

        return updateErrorField(inputError);
      }

      if (!newJob.applyType) {
        const inputError = {
          field: "applyType",
          errorMessage: "Apply type is required",
        };

        return updateErrorField(inputError);
      }

      try {
        await postJob(newJob);

        props.onJobPostSuccess("Job posted successfully");

        handleCloseModal();
      } catch (err) {
        props.onError("Something went wrong while posting job");
      }
    }
  };

  const updateJobField = (key, value) => {
    const updatedJob = { ...newJob, [key]: value };

    updateNewJob(updatedJob);
  };

  return (
    <>
      <Button type="primary" onClick={() => updateShowModal(true)}>
        Create Job
      </Button>
      <Modal isOpen={showModal} closeModal={handleCloseModal}>
        <div className="flex justify-between mb-6">
          <h1 className="text-xl">Create a job</h1>
          <h1 className="font-medium">Step {currentStep}</h1>
        </div>
        <div>
          {currentStep === 1 ? (
            <StepOneForm
              job={newJob}
              updateJobField={updateJobField}
              errorField={errorField}
            />
          ) : (
            <StepTwoForm
              job={newJob}
              updateJobField={updateJobField}
              errorField={errorField}
            />
          )}
        </div>
        <div className="text-end">
          <Button type="primary" onClick={handleButtonClick}>
            {currentStep === 1 ? "Next" : "Save"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
