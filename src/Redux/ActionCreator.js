import axios from "axios";
import {
  AddRequest,
  RemoveRequest,
  UpdateRequest,
  getAllRequestFail,
  getAllRequestSuccess,
  getByCodeSuccess,
  makeRequest,
} from "./Action";
import { toast } from "react-toastify";

export const GetAllCompanies = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      axios
        .get("http://localhost:8000/company")
        .then((res) => {
          const _list = res.data;
          dispatch(getAllRequestSuccess(_list));
        })
        .catch((err) => {
          dispatch(getAllRequestFail(err.message));
        });
    }, 1000);
  };
};

export const GetCompanyByCode = (code) => {
  return (dispatch) => {
    //dispatch(makeRequest());
    axios
      .get(`http://localhost:8000/company/${code}`)
      .then((res) => {
        const _obj = res.data;
        dispatch(getByCodeSuccess(_obj));
      })
      .catch((err) => {
        toast.error("Failed to fetch the data");
      });
  };
};

export const CreateCompany = (data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/company", data)
      .then((res) => {
        dispatch(AddRequest(data));
        toast.success("User created successfully.");
      })
      .catch((err) => {
        toast.error(`Failed to add due to: ${err.message}`);
      });
  };
};

export const UpdateCompany = (data) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/company/${data.id}`, data)
      .then((res) => {
        dispatch(UpdateRequest(data));
        toast.success("User updated successfully.");
      })
      .catch((err) => {
        toast.error(`Failed to update due to: ${err.message}`);
      });
  };
};

export const RemoveCompany = (code) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/company/${code}`)
      .then((res) => {
        dispatch(RemoveRequest(code));
        toast.success("Company Removed successfully.");
      })
      .catch((err) => {
        toast.error(`Failed to remove due to: ${err.message}`);
      });
  };
};
