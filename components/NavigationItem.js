import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames"; // Utility for conditionally joining class names

const NavigationItem = ({ icon: Icon, label, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all cursor-pointer",
        {
          "bg-red-500 text-white": isActive,
          "hover:text-red-500 dark:text-gray-400 dark:hover:text-gray-50": !isActive,
        }
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
};

NavigationItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NavigationItem;
