function Button({ children, primary, danger, ...rest }) {
  let BASE =
    " py-2 px-4 rounded drop-shadow-lg hover:drop-shadow-xl font-medium";
  let DEFAULT = "text-sky-500 hover:text-sky-700 bg-slate-50 hover:bg-sky-100";
  let DANGER = " text-red-500 hover:text-red-700 bg-slate-50 hover:bg-red-100";

  let classes = rest.classNames + BASE;
  if (danger) {
    classes = classes + " " + DANGER;
  } else {
    classes = classes + " " + DEFAULT;
  }

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
