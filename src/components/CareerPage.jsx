import { React, useEffect, useState, useRef } from "react";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import ModalBuilder from "./ModalBuilder";
import { DeleteModal } from "./ModalBuilder";
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";

import { get, post } from "../utils";
import MySnackbar from "./MySnackbar";
import TableBuilder from "./TableBuilder";
import { format_date } from "../utils";
import BackDrop from "./BackDrop";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { set } from "date-fns";

function CareerPage() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    type: "success",
    message: "This is a Success Message !",
  });

  const [loader, setLoader] = useState(true);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const [values, setValues] = useState({
    position: "",
    location: "",
    experience_min: "",
    experience_max: "",
    post_link: "",
    created_on: new Date(),
    deadline: new Date(),
  });

  const handleOpen = () => {
    setValues({
      ...values,
      position: "",
      location: "",
      experience_min: "",
      experience_max: "",
      post_link: "",
      created_on: new Date(),
      deadline: new Date(),
    });
    setModal(true);
  };

  const handleEditOpen = () => {
    setEditModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const fetchData = async () => {
    get(`${process.env.REACT_APP_API_URL}/career-jobs/all`, 
      {}
    )
      .then((result) => {
        setAllJobs(result.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const resultReceived = useRef(false);

  useEffect(() => {
    if (resultReceived.current === true) {
      setSnackbar(true);
      resultReceived.current = false;
    }
  }, [apiResponse]);

  const handleSubmit = async () => {
    setModal(false);
    setLoader(true);

    post(
      `${process.env.REACT_APP_API_URL}/career-jobs/new`,
      values,
      { withCredentials: true }
    ).then((apiResponseResult) => {
      if (
        apiResponseResult.status !== undefined &&
        apiResponseResult.data.message !== undefined
      ) {
        setApiResponse({
          ...apiResponse,
          type: apiResponseResult.status === 201 ? "success" : "error",
          message: apiResponseResult.data.message,
        });
      }
  
      fetchData();
    }).catch((error) => {
      console.log(error);

      if (error.response.status === 500 && error.response.data.message !== undefined) {
        setApiResponse({
          ...apiResponse,
          type: "error",
          message: error.response.data.message,
        });
        resultReceived.current = true;
      }
    });

    setValues({
      ...values,
      position: "",
      location: "",
      experience_min: "",
      experience_max: "",
      post_link: "",
      created_on: new Date(),
      deadline: new Date(),
    });
    setSnackbar(true);
  };

  const handleEditSubmit = () => {
    setEditModal(false);
    setLoader(true);

    post(
      `${process.env.REACT_APP_API_URL}/career-jobs/edit`,
      { value: values, id: currentJob._id },
      { withCredentials: true }
    ).then((apiResponseResult) => {
      if (
        apiResponseResult.status !== undefined &&
        apiResponseResult.data.message !== undefined
      ) {
        setApiResponse({
          ...apiResponse,
          type: apiResponseResult.status === 200 ? "success" : "error",
          message: apiResponseResult.data.message,
        });
      }
  
      fetchData();      
    }).catch((error) => {
      console.log(error);

      if (error.response.status === 500 && error.response.data.message !== undefined) {
        setApiResponse({
          ...apiResponse,
          type: "error",
          message: error.response.data.message,
        });
        resultReceived.current = true;
      }
    });

    setSnackbar(true);
  };

  const renderForm = () => {
    const handleValues = (name, newVal) => {
      setValues((prevState) => ({
        ...prevState,
        [name]: newVal,
      }));
    };

    return (
      <Grid style={{ padding: "0.5rem" }}>
        <Grid>
          <TextField
            label="Role"
            margin="normal"
            fullWidth
            value={values.position}
            onChange={(e) => {
              handleValues("position", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Location"
            margin="normal"
            fullWidth
            value={values.location}
            onChange={(e) => {
              handleValues("location", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Minimum Experience Required (Only Number)"
            margin="normal"
            fullWidth
            value={values.experience_min}
            onChange={(e) => {
              handleValues("experience_min", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Maximum Experience Required (Only Number)"
            margin="normal"
            fullWidth
            value={values.experience_max}
            onChange={(e) => {
              handleValues("experience_max", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Job Post URL"
            margin="normal"
            fullWidth
            value={values.post_link}
            onChange={(e) => {
              handleValues("post_link", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={values.deadline}
              onChange={(newValue) => {
                handleValues("deadline", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Application Deadline"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    );
  };

  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [currentJob, setCurrentJob] = useState({});

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentJob(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isEditButtonClicked = useRef(false);

  useEffect(() => {
    if (isEditButtonClicked.current === true) {
      handleEditOpen();
      isEditButtonClicked.current = false;
    }
  }, [values]);

  const deleteJob = (id) => {
    setLoader(true);
    post(`${process.env.REACT_APP_API_URL}/career-jobs/delete`, {id: id}, { withCredentials: true }).
    then((apiResponseResult) => {
      console.log(apiResponseResult);

      if (
        apiResponseResult.status !== undefined &&
        apiResponseResult.data.message !== undefined
      ) {
        setApiResponse({
          ...apiResponse,
          type: apiResponseResult.status === 200 ? "success" : "error",
          message: apiResponseResult.data.message,
        });
      }
  
      fetchData();
      setSnackbar(true);
    }).
    catch((error) => {
      if (
        error.status !== undefined &&
        error.data.message !== undefined
      ) {
        setApiResponse({
          ...apiResponse,
          type: "error",
          message: error.data.message,
        });
      }
    });
  }

  const actionOnMenu = (type) => {
    if (type === "edit") {
      // console.log(currentJob);
      setValues({
        ...currentJob,
        deadline: new Date(currentJob.application_deadline),
      });
      isEditButtonClicked.current = true;
    } else if (type === "delete") {
      console.log(currentJob);
      
      // deleteJob(currentJob._id);
      setDeleteConfirmModal(true);
    }

    setAnchorEl(null);
  };

  const MoreOptions = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            actionOnMenu("edit");
          }}
        >
          <EditIcon style={{ marginRight: "0.5rem" }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionOnMenu("delete");
          }}
        >
          <DeleteIcon style={{ marginRight: "0.5rem" }} /> Delete
        </MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <Grid container>
        <MySnackbar
          open={snackbar}
          setSnackbar={setSnackbar}
          type={apiResponse.type}
          message={apiResponse.message}
        />

        <BackDrop open={loader} />

        <Grid item xl={10} lg={10} md={10} sm={12}>
          <h4 className="sub-heading" style={{ marginTop: "-0.5rem" }}>
            Current Job Openings
          </h4>
        </Grid>

        <Grid item xl={2} lg={2} md={2} sm={12}>
          <Button variant="contained" onClick={handleOpen}>
            Create New Opening
          </Button>
        </Grid>
      </Grid>

      <ModalBuilder
        open={modal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title={"Create New Opening"}
        content={renderForm}
        buttonText={"Create"}
      />

      <ModalBuilder
        open={editModal}
        handleOpen={handleEditOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEditSubmit}
        title={"Edit Job Data"}
        content={renderForm}
        buttonText={"Save Changes"}
      />

      <DeleteModal open={deleteConfirmModal} handleClose={() => {setDeleteConfirmModal(false)}} handleSubmit={() => {setDeleteConfirmModal(false); deleteJob(currentJob._id); }} />

      <Grid>
        {/* <style></style> */}
        <TableBuilder
          rows={allJobs}
          tableHeaders={[
            "#",
            "Job Role",
            "Location",
            "Experience Min",
            "Experience Max",
            "Application Deadline",
            "Job Url",
            "Created On",
            "Action",
          ]}
          columns={[
            { key: "position" },
            { key: "location" },
            {
              key: "experience_min",
              render: true,
              renderValue: (row, key) => {
                return `${row[key]} Years`;
              },
            },
            {
              key: "experience_max",
              render: true,
              renderValue: (row, key) => {
                return `${row[key]} Years`;
              },
            },
            {
              key: "application_deadline",
              render: true,
              renderValue: (row, key) => {
                return format_date(row[key], "Asia/Kolkata", "dd-MMMM-yyyy");
              },
            },
            {
              key: "post_link",
              render: true,
              renderValue: (row, key) => {
                return <a href={`${row[key]}`} target="_blank">{row[key]}</a>;
              },
            },
            {
              key: "created_on",
              render: true,
              renderValue: (row, key) => {
                return format_date(row[key], "Asia/Kolkata", "dd-MMMM-yyyy");
              },
            },
            {
              key: "action",
              render: true,
              renderValue: (row, key) => {
                return (
                  <IconButton
                    color="primary"
                    onClick={(event) => {
                      handleClick(event, row);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                );
              },
            },
          ]}
          autoNumbering={true}
          height={"auto"}
        />
        <MoreOptions />
      </Grid>
    </>
  );
}

export default CareerPage;
