"use client";
import { useState } from "react";
import Button from "../button";
import Modal from "../modal";
import { DeleteIcon } from "../icon";
import { deleteJob } from "@/app/jobs/api";

export default function JobDelete(props) {
  const { job, onDeleteSucess, onError } = props;

  const [showModal, updateShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      updateShowModal(false);

      await deleteJob(job.id);

      onDeleteSucess("Job deleted successfully");
    } catch (err) {
      console.error(err);
      onError("Something went wrong while deleting job");
    }
  };

  return (
    <>
      <Button
        className="border-0 px-0 py-0 text-primary"
        onClick={() => updateShowModal(true)}
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={showModal} closeModal={() => updateShowModal(false)}>
        <div>
          <h1 className="text-xl">Confirm Deletion</h1>
          <div className="text-placeholder py-4">
            Are you sure you want to delete this job ?
          </div>
          <div>
            <div className="mr-2 inline-block">
              <Button type="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
            <Button onClick={() => updateShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
