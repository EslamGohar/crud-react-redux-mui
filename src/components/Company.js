import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { openPopup } from "../Redux/Action";
import {
  CreateCompany,
  GetAllCompanies,
  GetCompanyByCode,
  RemoveCompany,
  UpdateCompany,
} from "../Redux/ActionCreator";

const Company = (props) => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Full Name" },
    { id: "birthDate", name: "Birth Date" },
    { id: "academicYear", name: "Academic Year" },
    { id: "gender", name: "Gender" },
    { id: "governorate", name: "Governorate" },
    { id: "action", name: "Actions" },
  ];

  const dispatch = useDispatch();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [administration, setAdministration] = useState("");
  const [open, setOpen] = useState(false);

  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, SetPage] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("Create company");

  const editObj = useSelector((state) => state.company.teacherObj);

  const setEditState = (data) => {
    setId(data.id);
    setName(data.name);
    setBirthDate(data.birthDate);
    setAcademicYear(data.academicYear);
    setGender(data.gender);
    setGovernorate(data.Governorate);
  };

  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setEditState(editObj);
    } else {
      clearState();
    }
  }, [editObj]);

  useEffect(() => {
    props.loadCompany();
  }, []);

  const handleSetPage = (e, newPage) => {
    SetPage(newPage);
  };

  const handleSetRowPerPage = (e) => {
    setRowPerPage(+e.target.value);
    SetPage(0);
  };

  const addTeacher = () => {
    setIsEdit(false);
    setTitle("Create company");
    openDialog();
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
    clearState();
    dispatch(openPopup());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _obj = {
      id,
      name,
      birthDate,
      gender,
      academicYear,
      Governorate: governorate,
      administration,
    };

    if (isEdit) {
      dispatch(UpdateCompany(_obj));
    } else {
      dispatch(CreateCompany(_obj));
    }
    closeDialog();
  };

  const handleEdit = (code) => {
    setIsEdit(true);
    setTitle("Update company");
    setOpen(true);
    dispatch(GetCompanyByCode(code));
  };

  const handleRemove = (code) => {
    if (window.confirm("Do you want to remove that?")) {
      dispatch(RemoveCompany(code));
    }
  };

  const clearState = () => {
    setId(0);
    setName("");
    setBirthDate("");
    setGender("");
    setAcademicYear("");
    setGovernorate("");
  };

  return props.companyState.isLoading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.companyState.errorMessage ? (
    <div>
      <h2>{props.companyState.errorMessage}</h2>
    </div>
  ) : (
    <div>
      <Paper sx={{ margin: "5%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={addTeacher} variant="contained">
            Add New (+)
          </Button>
        </div>

        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "lightgrey" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "black" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {props.companyState.teachersList &&
                  props.companyState.teachersList
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.birthDate}</TableCell>
                          <TableCell>{row.academicYear}</TableCell>
                          <TableCell>{row.gender}</TableCell>
                          <TableCell>{row.Governorate}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                handleEdit(row.id);
                              }}
                              variant="contained"
                              color="primary"
                            >
                              <EditIcon />
                            </Button>

                            <Button
                              onClick={() => {
                                handleRemove(row.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          {/*Table Pagination */}
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            rowsPerPage={rowPerPage}
            page={page}
            count={props.companyState.teachersList.length}
            component={"div"}
            onPageChange={handleSetPage}
            onRowsPerPageChange={handleSetRowPerPage}
          ></TablePagination>
        </div>
      </Paper>

      {/* the input fields of Form in dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
          <IconButton style={{ float: "right" }} onClick={closeDialog}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                required
                variant="outlined"
                label="Full Name"
                error={name.length === 0}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  variant="outlined"
                  label="Birth Date"
                  value={dayjs(birthDate)}
                  onChange={(newDate) => {
                    setBirthDate(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
              <TextField
                required
                label="Academic Year"
                variant="outlined"
                error={name.length === 0}
                value={academicYear}
                onChange={(e) => {
                  setAcademicYear(e.target.value);
                }}
              ></TextField>
              <FormControl>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  required
                  label="Gender"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="governorate">Governorate</InputLabel>
                <Select
                  label="Governorate"
                  variant="outlined"
                  value={governorate}
                  placeholder="Governorate"
                  onChange={(e) => {
                    setGovernorate(e.target.value);
                  }}
                >
                  <MenuItem value="Cairo">Cairo</MenuItem>
                  <MenuItem value="Giza">Giza</MenuItem>
                  <MenuItem value="Alexandria">Alexandria</MenuItem>
                  <MenuItem value="Al Gharbia">Gharbia</MenuItem>
                  <MenuItem value="Banha">Banha</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companyState: state.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCompany: () => dispatch(GetAllCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
