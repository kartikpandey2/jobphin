export default function Button(props) {
  const { type, ...restProps } = props;

  let buttonTypeStyles = "py-2 px-4 rounded-md border-1 font-medium";

  switch (type) {
    case "primary": {
      buttonTypeStyles += " bg-primary text-font-white border-primary";

      break;
    }

    case "outlined": {
      buttonTypeStyles += " bg-white text-primary border-primary";

      break;
    }

    case "danger": {
      buttonTypeStyles += " bg-error text-font-white border-error";

      break;
    }

    default: {
      buttonTypeStyles += " bg-white border-border-gray";

      break;
    }
  }

  return (
    <button className={buttonTypeStyles} {...restProps}>
      {props.children}
    </button>
  );
}
