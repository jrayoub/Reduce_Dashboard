import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button as MyButton, Filter_Selector, LoadingIcon } from "../index";
import { BaseUrl, Coockies_name } from "../../constants";
import { get_villes } from "../../Utils/villes/get_villes";
import { useCookies } from "react-cookie";
import { get_Activity } from "../../Utils/Activities/Activities";

const UpdatePartner = ({ open, OnClick, partner, setRefresh }) => {
  const [cookies, setCookie, removeCookie] = useCookies([Coockies_name]);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(false);
  const hadlerClose = () => {
    OnClick();
  };

  useEffect(() => {
    if (!loading) hadlerClose();
  }, [loading]);

  useEffect(() => {
    setdata(partner);
  }, [partner]);

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        onClose={hadlerClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Mettre à Jour Ce Partenaire"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p class="text-gray-600 text-xs ">Remplissez les champs vides</p>
          </DialogContentText>
        </DialogContent>
        <div className="w-full grid place-content-center">
          <Fill_Form data={data} setdata={setdata} />
        </div>
        <div className="h-[60px]"></div>
        <DialogActions>
          <Button
            onClick={async (e) => {
              setloading(true);
              try {
                const req = await fetch(`${BaseUrl}/Admin/update_partner`, {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.accesToken}`,
                  },
                  referrerPolicy: "no-referrer",
                  body: JSON.stringify(data),
                });
                setRefresh((val) => val + 1);
                setloading(false);
              } catch (err) {
                setloading(false);
              }
            }}
          >
            <MyButton
              title="Confirmez"
              Icon={() => LoadingIcon(loading)}
              style="bg-red-500 p-[20px] font-bold text-xl !p-[1px]"
            />
          </Button>
          <Button onClick={hadlerClose}>
            <MyButton
              title="Annulez"
              style="!bg-red-500 p-[20px]  font-bold text-xl !p-[1px]"
            />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Fill_Form = ({ data, setdata }) => {
  let [villes, setvilles] = useState([]);
  const [Activities, setActivities] = useState([]);

  useEffect(() => {
    get_villes(setvilles);
    get_Activity(setActivities);
  }, []);

  return (
    <form class="w-full max-w-lg ">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Raison sociale
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            type="text"
            value={data.nome_entreprise}
            onChange={(e) => {
              setdata({ ...data, nome_entreprise: e.target.value });
            }}
            placeholder="Jane Doe"
          />
        </div>

        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            ICE
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.identificateur_entreprise}
            onChange={(e) => {
              setdata({ ...data, identificateur_entreprise: e.target.value });
            }}
            type="text"
          />
        </div>

        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Représentant Entreprise
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.representant_entreprise}
            onChange={(e) => {
              setdata({ ...data, representant_entreprise: e.target.value });
            }}
            type="text"
          />
        </div>

        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Fonction
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.role_dans_entriprise}
            onChange={(e) => {
              setdata({ ...data, role_dans_entriprise: e.target.value });
            }}
            type="text"
          />
        </div>

        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Adresse
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.adrress}
            onChange={(e) => {
              setdata({ ...data, adrress: e.target.value });
            }}
            type="text"
          />
        </div>

        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Offer
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.offer}
            onChange={(e) => {
              setdata({ ...data, offer: e.target.value });
            }}
            type="text"
          />
        </div>
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
            Note
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-name"
            value={data.note}
            onChange={(e) => {
              setdata({ ...data, note: e.target.value });
            }}
            type="text"
          />
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Filter_Selector
              title={"Ville"}
              Filter={data.ville}
              setFilter={(value) => {
                setdata({ ...data, ville: value });
              }}
              options={villes}
              styles={"!max-w-full"}
            />
          </div>

          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Filter_Selector
              title={"d'activité"}
              Filter={data.activity_entrprise}
              setFilter={(value) => {
                setdata({ ...data, activity_entrprise: value });
              }}
              options={Activities}
              styles={"!max-w-full"}
            />
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <Filter_Selector
              title={"Partenaire Statut"}
              Filter={data._status}
              setFilter={(value) => {
                setdata({ ...data, _status: value });
              }}
              options={[
                { value: "", name: "" },
                { value: "Approved", name: "Approved" },
                { value: "Rejected", name: "Rejected" },
                { value: "Pending", name: "Pending" },
              ]}
              styles={"!max-w-full"}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default UpdatePartner;
