import { React, useState, useEffect, useRef } from "react";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import ModalBuilder from "../ModalBuilder";
import { DeleteModal } from "../ModalBuilder";
import TableBuilder from "../TableBuilder";
import DataNotFound from "../DataNotFound";
import MySnackbar from "../MySnackbar";
import BackDrop from "../BackDrop";

import { get, post } from "../../utils";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MasterData = () => {
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    type: "",
    message: "",
  });

  const resultReceived = useRef(false);

  useEffect(() => {
    if (resultReceived.current === true) {
      setSnackbar(true);
      resultReceived.current = false;
    }
  }, [apiResponse]);

  const [loader, setLoader] = useState(true);

  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    buildingNum: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleOpen = () => {
    setInputValues({
      ...inputValues,
      name: "",
      buildingNum: "",
      street: "",
      city: "",
      pincode: "",
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
    get(`${process.env.REACT_APP_API_URL}/master-data/all`, {
      withCredentials: true,
    })
      .then((result) => {
        const resData = result.data.data;

        console.log(resData);

        let finalData = [];

        resData.map((row) => {
            const newItem = {
                _id: row._id,
                name: row.name,
                buildingNum: row.building_no,
                street: row.street,
                city: row.city,
                pincode: row.pincode
            };
            finalData.push(newItem);
        });

        setData(finalData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setSnackbar(true);
    setModal(false);
    setLoader(true);

    post(`${process.env.REACT_APP_API_URL}/master-data/new`, inputValues, {
      withCredentials: true,
    })
      .then((apiResponseResult) => {
        if (
          apiResponseResult.status !== undefined &&
          apiResponseResult.data.message !== undefined
        ) {
          setApiResponse({
            ...apiResponse,
            type: apiResponseResult.status === 201 ? "success" : "error",
            message: apiResponseResult.data.message,
          });
          setLoader(false);
          resultReceived.current = true;
        }

        fetchData();
      })
      .catch((error) => {
        console.log(error);

        if (
          error.response.status === 500 &&
          error.response.data.message !== undefined
        ) {
          setApiResponse({
            ...apiResponse,
            type: "error",
            message: error.response.data.message,
          });
          setLoader(false);
          resultReceived.current = true;
        }
      });

    setInputValues({
      ...inputValues,
      name: "",
      buildingNum: "",
      street: "",
      city: "",
      pincode: "",
    });
  };

  const handleEditSubmit = () => {
    setEditModal(false);
    setLoader(true);

    console.log(currentMaster);

    post(
      `${process.env.REACT_APP_API_URL}/master-data/edit`,
      { value: inputValues, id: currentMaster._id },
      { withCredentials: true }
    )
      .then((apiResponseResult) => {
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
      })
      .catch((error) => {
        console.log(error);

        if (
          error.response.status === 500 &&
          error.response.data.message !== undefined
        ) {
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
      setInputValues((prevState) => ({
        ...prevState,
        [name]: newVal,
      }));
    };

    return (
      <Grid style={{ padding: "0.5rem" }}>
        <Grid>
          <TextField
            label="Name"
            margin="normal"
            fullWidth
            value={inputValues.name}
            onChange={(e) => {
              handleValues("name", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Building Number"
            margin="normal"
            fullWidth
            value={inputValues.buildingNum}
            onChange={(e) => {
              handleValues("buildingNum", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Street"
            margin="normal"
            fullWidth
            value={inputValues.street}
            onChange={(e) => {
              handleValues("street", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="City"
            margin="normal"
            fullWidth
            value={inputValues.city}
            onChange={(e) => {
              handleValues("city", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Pincode"
            margin="normal"
            fullWidth
            value={inputValues.pincode}
            onChange={(e) => {
              handleValues("pincode", e.target.value);
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [currentMaster, setCurrentMaster] = useState({});

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentMaster(row);
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
  }, [inputValues]);

  const deleteMasterData = (id) => {
    setLoader(true);
    post(`${process.env.REACT_APP_API_URL}/master-data/delete`, {id: id}, { withCredentials: true }).
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
      console.log(currentMaster);
      setInputValues({
        ...currentMaster
      });
      isEditButtonClicked.current = true;
    } else if (type === "delete") {
        // console.log(currentMaster);

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
      <MySnackbar
        open={snackbar}
        setSnackbar={setSnackbar}
        type={apiResponse.type}
        message={apiResponse.message}
      />

      <BackDrop open={loader} />

      <Grid container style={{ marginTop: "2rem" }}>
        <Grid item xl={10} lg={10} md={12} sm={12}>
          <h4 className="sub-heading" style={{ marginTop: "-0.5rem" }}>
            Master Data
          </h4>
        </Grid>
        <Grid item xl={2} lg={2} md={12} sm={12}>
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon style={{ marginRight: "0.5rem" }} />
            Create New
          </Button>
        </Grid>

        <Grid>
          <ModalBuilder
            open={modal}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            title={"Create New Master Data"}
            content={renderForm}
            buttonText={"Create"}
          />

          <ModalBuilder
            open={editModal}
            handleOpen={handleEditOpen}
            handleClose={handleEditClose}
            handleSubmit={handleEditSubmit}
            title={"Edit Master Data"}
            content={renderForm}
            buttonText={"Save Changes"}
          />

          <DeleteModal
            open={deleteConfirmModal}
            handleClose={() => {
              setDeleteConfirmModal(false);
            }}
            handleSubmit={() => {
              setDeleteConfirmModal(false);
              deleteMasterData(currentMaster._id);
            }}
          />

          {data.length > 0 ? (
            <TableBuilder
              rows={data}
              tableHeaders={["#", "Name", "Building No.", "Street", "City", "Pin Code", "Action"]}
              columns={[
                { key: "name" },
                { key: "buildingNum" },
                { key: "street" },
                { key: "city" },
                { key: "pincode" },
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
          ) : (
            <DataNotFound />
          )}
          <MoreOptions />
        </Grid>
      </Grid>
    </>
  );
};

export default MasterData;