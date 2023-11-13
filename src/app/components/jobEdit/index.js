"use client";
import { useState } from "react";
import Modal from "../modal";
import StepOneForm from "../createJob/stepOneForm";
import StepTwoForm from "../createJob/stepTwoForm";
import Button from "../button";
import { EditIcon } from "../icon";
import { updateJob as updateJobAPI } from "@/app/jobs/api";

const errorFieldInit = {
  field: "",
  errorMessage: "",
};

export default function JobEdit(props) {
  const { job: jobInit, onEditSuccess, onError } = props;

  const [showModal, updateShowModal] = useState(false);
  const [currentStep, updateStep] = useState(1);
  const [job, updateJob] = useState(jobInit);
  const [errorField, updateErrorField] = useState(errorFieldInit);

  const handleCloseModal = () => {
    updateShowModal(false);
    updateStep(1);
    updateJob(jobInit);
  };

  const updateJobField = (key, value) => {
    const updatedJob = { ...job, [key]: value };

    updateJob(updatedJob);
  };

  const handleButtonClick = async () => {
    if (currentStep === 1) {
      //validate data and push next step

      if (!job.title) {
        const inputError = {
          field: "title",
          errorMessage: "Job title is required",
        };

        return updateErrorField(inputError);
      }

      if (!job.companyName) {
        const inputError = {
          field: "companyName",
          errorMessage: "Company name is required",
        };

        return updateErrorField(inputError);
      }

      if (!job.industry) {
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

      const minExperience = parseInt(job.experience.min);
      const maxExperience = parseInt(job.experience.max);

      if (minExperience > maxExperience) {
        const inputError = {
          field: "experience",
          errorMessage: "Min experience cannot be greater than max experience",
        };

        return updateErrorField(inputError);
      }

      const minSalary = parseInt(job.salary.min);
      const maxSalary = parseInt(job.salary.max);

      if (minSalary > maxSalary) {
        const inputError = {
          field: "salary",
          errorMessage: "Min salary cannot be greater than max salary",
        };

        return updateErrorField(inputError);
      }

      if (!job.applyType) {
        const inputError = {
          field: "applyType",
          errorMessage: "Apply type is required",
        };

        return updateErrorField(inputError);
      }

      try {
        await updateJobAPI(job.id, job);

        updateShowModal(false);
        onEditSuccess("Job edited successfully");
      } catch (err) {
        console.error(err);
        onError("Something went wrong while updating job");
      }
    }
  };

  return (
    <>
      <Button
        className="border-0 px-0 py-0 pr-4 text-primary"
        onClick={() => updateShowModal(true)}
      >
        <EditIcon />
      </Button>
      <Modal isOpen={showModal} closeModal={handleCloseModal}>
        <div className="flex justify-between mb-6">
          <h1 className="text-xl">Update job</h1>
          <h1 className="font-medium">Step {currentStep}</h1>
        </div>
        <div className="mb-24">
          {currentStep === 1 ? (
            <StepOneForm
              job={job}
              updateJobField={updateJobField}
              errorField={errorField}
            />
          ) : (
            <StepTwoForm
              job={job}
              updateJobField={updateJobField}
              errorField={errorField}
            />
          )}
        </div>
        <div className="text-end">
          <Button type="primary" onClick={handleButtonClick}>
            {currentStep === 1 ? "Next" : "Update"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
