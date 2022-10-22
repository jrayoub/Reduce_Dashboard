import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Button as MyButton, Filter_Selector, LoadingIcon } from "./index";
import { BaseUrl, Coockies_name } from "../constants";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { get_villes } from "../Utils/villes/get_villes";

const Fill_Form = (data, setdata) => {
  let [villes, setvilles] = useState([{ value: 0, name: "" }]);
  useEffect(() => {
    setvilles(null);
    get_villes(setvilles);
  }, []);
  return (
    <form class="w-full max-w-lg ">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Admin Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            type="text"
            value={data._name}
            onChange={(e) => setdata({ ...data, _name: e.target.value })}
            placeholder="Jane Doe"
          />
          <p class="text-gray-600 text-xs italic">
            this name will be shown on the dashboard
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Email
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            value={data.email}
            onChange={(e) => setdata({ ...data, email: e.target.value })}
            placeholder="Example@email.com"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Password
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="password"
            value={data._password}
            onChange={(e) => setdata({ ...data, _password: e.target.value })}
            placeholder="**********"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Filter_Selector
            title={"Ville"}
            Filter={data.ville}
            setFilter={(value) => setdata({ ...data, ville: value })}
            options={villes}
            styles={"!max-w-full"}
          />
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Filter_Selector
            title={"Role"}
            Filter={data._role}
            setFilter={(value) => setdata({ ...data, _role: value })}
            options={[
              { value: "", name: "" },
              { value: "Admin", name: "Admin" },
              { value: "Manager", name: "Manager" },
            ]}
            styles={"!max-w-full"}
          />
        </div>
      </div>
    </form>
  );
};

function AddNewAdmin({ open, OnClick }) {
  let [data, setdata] = useState({
    email: "",
    ville: 0,
    _password: "",
    _role: "Manager",
    _name: "",
  });
  const [loading, setloading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([Coockies_name]);

  const hadlerClose = () => {
    OnClick();
  };
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        onClose={hadlerClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add New Admin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p class="text-gray-600 text-xs ">
              please fill the information of the admin you want to add
            </p>
          </DialogContentText>
        </DialogContent>
        <div className="w-full grid place-content-center">
          <Fill_Form data={data} setdata={setdata} />
        </div>
        <div className="h-[100px]"></div>
        <DialogActions>
          <Button
            onClick={async (e) => {
              setloading(true);
              try {
                const req = await fetch(`${BaseUrl}/admin/add_Admin`, {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.accesToken}`,
                  },
                  referrerPolicy: "no-referrer",
                  body: JSON.stringify({
                    id: data.id,
                  }),
                });
                setloading(false);
              } catch (err) {
                setloading(false);
              }
            }}
          >
            <MyButton
              Icon={() => LoadingIcon(loading)}
              title="Add Admin"
              style="bg-red-500 p-[20px] font-bold text-xl !p-[1px]"
            />
          </Button>
          <Button onClick={hadlerClose}>
            <MyButton
              title="cancle"
              style="!bg-red-500 p-[20px]  font-bold text-xl !p-[1px]"
            />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddNewAdmin;
