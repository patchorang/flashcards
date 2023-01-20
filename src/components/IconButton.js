function IconButton({ icon, onClick, onRight = false, children }) {
  const Icon = icon;
  let iconStyles =
    "text-slate-500 group-hover:text-slate-700 hover:text-slate-700 inline align-bottom ";
  if (onRight) {
    iconStyles += " ml-2";
  } else {
    iconStyles += " mr-2";
  }
  const renderedIcon = <Icon className={iconStyles} size={24} />;

  return (
    <div className="group flex content-center cursor-pointer" onClick={onClick}>
      {onRight ? null : renderedIcon}
      <p className="text-slate-500 group-hover:text-slate-700 hover:text-slate-700 inline font-medium">
        {children}
      </p>
      {onRight ? renderedIcon : null}
    </div>
  );
}

export default IconButton;
