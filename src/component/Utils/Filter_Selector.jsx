import React from "react";

const Filter_Selector = ({
  title = "",
  options = [],
  styles,
  setFilter = () => {},
  Filter,
}) => {
  return (
    <div className={`w-[250px] ${styles}`}>
      <label
        for={title}
        className="block font-black mb-2 text-sm  text-gray-900 dark:text-gray-400"
      >
        {title}
      </label>
      <select
        value={Filter}
        onChange={(e) =>
          setFilter(e.target.value == "Tout" ? "" : e.target.value)
        }
        id={title}
        className="h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
		  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
		  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name == "" ? "Tout" : item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter_Selector;
