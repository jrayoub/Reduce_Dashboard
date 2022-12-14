import React, { useState, useEffect } from "react";

import {
  Filter_Selector,
  SearchBar,
  UpdatePartner,
  PartnerInfo,
  UserTable,
} from "../index";
import { BaseUrl, Coockies_name } from "../../constants";
import { get_Activity } from "../../Utils/Activities/Activities";
import { useCookies } from "react-cookie";
import { get_villes } from "../../Utils/villes/get_villes";

function Partner({ selectedStatus }) {
  const [isDialogOpend, setDialogOpend] = useState(false);
  const [isUpdateDialogOpend, setUpdateDialogOpend] = useState(false);
  const [City, setCity] = useState("");
  const [Activities, setActivities] = useState([]);
  let [villes, setvilles] = useState([{ value: 0, name: "" }]);

  const [activity_entrprise, setactivity_entrprise] = useState("");
  const [Search, setSearch] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([Coockies_name]);
  const [SelectedPartner, setSelectedpartner] = useState({});
  let [Odata, setOdata] = useState([]);
  let [Refresh, setRefresh] = useState(0);
  let [data, setdata] = useState([]);

  const handleRequest = async () => {
    try {
      const req = await fetch(`${BaseUrl}/admin/get_partners`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.accesToken}`,
        },
        referrerPolicy: "no-referrer",
      });
      if (req.ok) setOdata(await req.json());
    } catch (err) {}
  };

  useEffect(() => {
    handleRequest();
    get_Activity(setActivities);
    get_villes(setvilles);
  }, [Refresh]);

  useEffect(() => {
    setdata(
      selectedStatus != ""
        ? Odata.filter((item) => item._status == selectedStatus)
        : Odata
    );
    setdata((per) =>
      Search != ""
        ? per.filter((item) =>
            item.nome_entreprise.toLowerCase().includes(Search.toLowerCase())
          )
        : per
    );
    setdata((per) => {
      console.log(City);
      return City != 0 ? per.filter((item) => item.ville == City) : per;
    });
    setdata((per) =>
      activity_entrprise != 0
        ? per.filter((item) => item.activity_entrprise == activity_entrprise)
        : per
    );
  }, [Search, selectedStatus, City, Odata, activity_entrprise]);

  return (
    <div className="p-5 my-10">
      <PartnerInfo
        open={isDialogOpend}
        setRefresh={setRefresh}
        OnClick={() => {
          setDialogOpend(false);
        }}
        data={SelectedPartner}
      />

      <UpdatePartner
        open={isUpdateDialogOpend}
        setRefresh={setRefresh}
        OnClick={() => {
          setUpdateDialogOpend(false);
        }}
        partner={SelectedPartner}
      />

      <div className="flex flex-col items-start justify-start">
        <h1 className="text-[20px] font-black leading-9 text-gray-800">
          Reducte Partenaires
        </h1>
        <p className="text-[16px] font-normal  leading-9 text-gray-500">
          Partenaires ayant soumis le formulaire ?? la plateforme Reducte
        </p>
      </div>
      <div className="flex ld:flex-row flex-col w-full mt-10 lg:gap-5 gap-0 justify-center items-center">
        <SearchBar styles={"max-h-[15px] !w-full"} setSearch={setSearch} />
        <div className="flex flex-row w-full mt-10 gap-5 justify-start items-center">
          <Filter_Selector
            title={"Secteur d'activit??"}
            styles={"h-[95px]"}
            options={Activities}
            setFilter={(value) => setactivity_entrprise(value)}
            Filter={activity_entrprise}
          />
          <Filter_Selector
            title={"Ville"}
            styles={"h-[95px]"}
            options={villes}
            setFilter={(value) => setCity(value)}
            Filter={City}
          />
        </div>
      </div>
      <UserTable
        Data={data}
        selectedstatu={selectedStatus}
        OnSelect={(data) => {
          setSelectedpartner(data);
          setDialogOpend(true);
        }}
        OnEdit={(data) => {
          setSelectedpartner(data);
          setUpdateDialogOpend(true);
        }}
      />
    </div>
  );
}

export default Partner;
