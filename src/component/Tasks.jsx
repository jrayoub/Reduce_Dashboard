import React, { useState, useEffect } from "react";
import { UserTable } from "./index";
import { PartnerInfo } from "./index";
import { Filter_Selector, SearchBar, Button } from "./index";
import { BaseUrl } from "../constants";
import { Outlet } from "react-router-dom";
const Tasks = () => {
  const [isDialogOpend, setDialogOpend] = useState(false);
  const [City, setCity] = useState("");
  const [activity_entrprise, setactivity_entrprise] = useState("");
  const [AccountState, setAccountState] = useState("");

  const [SelectedPartner, setSelectedpartner] = useState({});
  let [data, setdata] = useState([]);
  return (
    <div className="p-5 my-10 flex flex-col gap-5">
      <div className="flex ld:flex-row flex-col w-full mt-10 lg:gap-5 gap-0 justify-center items-center">
        <SearchBar styles={"max-h-[15px] !w-full"} />
        <div className="w-full h-[127px] flex flex-row items-center justify-start gap-5">
          <Button
            title={"Anounsment"}
            style={"border-2 border-blue-500 text-white w-[160px] !p-[0px]"}
          />
          <Button
            title={"Done"}
            style={
              "border-2 border-blue-500 bg-transparent text-black w-[160px] !p-[0px]"
            }
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Tasks;