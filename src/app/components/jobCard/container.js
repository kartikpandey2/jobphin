import cx from "classnames";

export default function JobCardContainer(props) {
  const { className = "", ...restProps } = props;

  return (
    <article
      className={cx(
        "bg-white py-4 px-6 border-1 border-border-gray rounded-[10px]",
        className
      )}
      {...restProps}
    >
      {props.children}
    </article>
  );
}
