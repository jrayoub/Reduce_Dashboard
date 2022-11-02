import { IoIosCloseCircle } from "react-icons/io";
import { BsCheckCircleFill, BsClockHistory } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

export const SideBarLinks = [
  {
    key: 0,
    groupName: "PARTNERS",
    tabs: [
      {
        name: "All Partners",
        Url: "",
        Icon: HiUsers,
        key: 0,
      },

      {
        name: "Pending Partners",
        Url: "Pending_partners",
        Icon: IoIosCloseCircle,
        key: 2,
      },
      {
        name: "Rejected Partners",
        Url: "Rejected_partners",
        Icon: IoIosCloseCircle,
        key: 3,
      },
      {
        name: "Approved Partners",
        Url: "Approved_partners",
        Icon: BsCheckCircleFill,
        key: 4,
      },
      {
        key: 1,
        name: "Tasks",
        Icon: FaTasks,
        Url: "tasks",
      },
      {
        key: 1,
        name: "Edit History",
        Icon: BsClockHistory,
        Url: "edit_history",
      },
    ],
  },
  {
    key: 1,
    groupName: "ADMIN",
    tabs: [
      {
        key: 0,
        name: "Managers",
        Icon: RiAdminFill,
        Url: "Admin_managers",
      },
    ],
  },
];

export const BaseUrl = "https://kji83y-5000.preview.csb.app/api/v1";

export const Coockies_name = "auth_name";
