"use client";
import Button from "../button";

export default function JobCardActions(props) {
  const { job, className = "" } = props;

  let buttonType = "primary";
  let buttonText = "Apply Now";

  if (job.applyType === "externalApply") {
    buttonType = "outlined";
    buttonText = "External Apply";
  }

  return (
    <div className={className}>
      <Button type={buttonType} onClick={props.onApply}>
        {buttonText}
      </Button>
    </div>
  );
}
