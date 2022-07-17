import { React, useState, useEffect, useRef } from "react";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import AddIcon from "@mui/icons-material/Add";

import ModalBuilder from "../ModalBuilder";
import { DeleteModal, FullScreenModal } from "../ModalBuilder";
import TableBuilder from "../TableBuilder";
import DataNotFound from "../DataNotFound";
import MySnackbar from "../MySnackbar";
import BackDrop from "../BackDrop";

import ViewLRDialogBox from "./ViewLRDialogBox";

import { get, post, base64ToArrayBuffer, saveByteArray } from "../../utils";
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import { format_date } from "../../utils";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";

const LorryReceipt = () => {
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
    lrNumber: "",
    date: new Date(),
    vehicleNumber: "",
    vehicleType: "",
    driverMobile: "",
    consignorName: "",
    consignorBuildingNum: "",
    consignorStreet: "",
    consignorCity: "",
    consignorPincode: "",
    consigneeName: "",
    consigneeBuildingNum: "",
    consigneeStreet: "",
    consigneeCity: "",
    consigneePincode: "",
    wayBill: "",
    gstNumber: "",
    specialInstructions: "",
    contactPerson: "",
    vehicleReportingDate: new Date(),
    vehicleReportingTime: new Date(),
    vehicleDepartureDate: new Date(),
    vehicleDepartureTime: new Date(),
    driverName: "",
    driverLicenseNumber: "",
    numOfPackages: "",
    goodsDescription: "",
    actualWeight: "",
    amountInFigures: "",
    amountInWords: "",
    documentNumber: "",
    documentDate: new Date(),
  });

  const handleOpen = () => {
    setInputValues({
      ...inputValues,
      lrNumber: "",
      date: new Date(),
      vehicleNumber: "",
      vehicleType: "",
      driverMobile: "",
      consignorName: "",
      consignorBuildingNum: "",
      consignorStreet: "",
      consignorCity: "",
      consignorPincode: "",
      consigneeName: "",
      consigneeBuildingNum: "",
      consigneeStreet: "",
      consigneeCity: "",
      consigneePincode: "",
      wayBill: "",
      gstNumber: "",
      specialInstructions: "",
      contactPerson: "",
      vehicleReportingDate: new Date(),
      vehicleReportingTime: new Date(),
      vehicleDepartureDate: new Date(),
      vehicleDepartureTime: new Date(),
      driverName: "",
      driverLicenseNumber: "",
      numOfPackages: "",
      goodsDescription: "",
      actualWeight: "",
      amountInFigures: "",
      amountInWords: "",
      documentNumber: "",
      documentDate: new Date(),
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
    get(`${process.env.REACT_APP_API_URL}/lorry-receipt/all`, {
      withCredentials: true,
    })
      .then((result) => {
        setData(result.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const [names, setNames] = useState([]);
  const [namesToAddressMapping, setNamesToAddressMApping] = useState({});

  useEffect(() => {
    fetchData();

    setLoader(true);
    get(`${process.env.REACT_APP_API_URL}/master-data/options`, {
        withCredentials: true,
      })
        .then((result) => {
          const resData = result.data;
  
          console.log(resData);

          setNames(resData.names);
          setNamesToAddressMApping(resData.namesToAddressMapping);
  
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
  }, []);

  const handleSubmit = async () => {
    setSnackbar(true);
    setModal(false);
    setLoader(true);

    post(`${process.env.REACT_APP_API_URL}/lorry-receipt/new`, inputValues, {
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
      lrNumber: "",
      date: new Date(),
      vehicleNumber: "",
      vehicleType: "",
      driverMobile: "",
      consignorName: "",
      consignorBuildingNum: "",
      consignorStreet: "",
      consignorCity: "",
      consignorPincode: "",
      consigneeName: "",
      consigneeBuildingNum: "",
      consigneeStreet: "",
      consigneeCity: "",
      consigneePincode: "",
      wayBill: "",
      gstNumber: "",
      specialInstructions: "",
      contactPerson: "",
      vehicleReportingDate: new Date(),
      vehicleReportingTime: new Date(),
      vehicleDepartureDate: new Date(),
      vehicleDepartureTime: new Date(),
      driverName: "",
      driverLicenseNumber: "",
      numOfPackages: "",
      goodsDescription: "",
      actualWeight: "",
      amountInFigures: "",
      amountInWords: "",
      documentNumber: "",
      documentDate: new Date(),
    });
  };

  const handleEditSubmit = () => {
    setEditModal(false);
    setLoader(true);

    post(
      `${process.env.REACT_APP_API_URL}/lorry-receipt/edit`,
      { value: inputValues, id: currentLR._id },
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

      if(name === "consignorName") {
        // console.log(namesToAddressMapping[`${newVal}`]);
        const newValuesMapping = namesToAddressMapping[`${newVal}`];

        setInputValues((prevState) => ({
          ...prevState,
          ["consignorBuildingNum"]: newValuesMapping.building_num,
          ["consignorStreet"]: newValuesMapping.street,
          ["consignorCity"]: newValuesMapping.city,
          ["consignorPincode"]: newValuesMapping.pincode
        }));
      }
      else if(name === "consigneeName") {
        // console.log(namesToAddressMapping[`${newVal}`]);
        const newValuesMapping = namesToAddressMapping[`${newVal}`];

        setInputValues((prevState) => ({
          ...prevState,
          ["consigneeBuildingNum"]: newValuesMapping.building_num,
          ["consigneeStreet"]: newValuesMapping.street,
          ["consigneeCity"]: newValuesMapping.city,
          ["consigneePincode"]: newValuesMapping.pincode
        }));
      }
    };

    return (
      <Grid style={{ padding: "0.5rem" }}>
        <Grid>
          <TextField
            label="LR Number"
            margin="normal"
            fullWidth
            value={inputValues.lrNumber}
            onChange={(e) => {
              handleValues("lrNumber", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={inputValues.date}
              onChange={(newValue) => {
                handleValues("date", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Date" margin="normal" />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <TextField
            label="Vehicle Number"
            margin="normal"
            fullWidth
            value={inputValues.vehicleNumber}
            onChange={(e) => {
              handleValues("vehicleNumber", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Vehicle Type"
            margin="normal"
            fullWidth
            value={inputValues.vehicleType}
            onChange={(e) => {
              handleValues("vehicleType", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Driver's Mobile Number"
            margin="normal"
            fullWidth
            value={inputValues.driverMobile}
            onChange={(e) => {
              handleValues("driverMobile", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignor From Name"
            margin="normal"
            fullWidth
            value={inputValues.consignorName}
            onChange={(e) => {
              handleValues("consignorName", e.target.value);
            }}
            select
          >
            {
              names.map((name) => {
                return (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                );
              })
            }
          </TextField>
        </Grid>
        <Grid>
          <TextField
            label="Consignor From Building Number"
            margin="normal"
            fullWidth
            value={inputValues.consignorBuildingNum}
            onChange={(e) => {
              handleValues("consignorBuildingNum", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignor From Street"
            margin="normal"
            fullWidth
            value={inputValues.consignorStreet}
            onChange={(e) => {
              handleValues("consignorStreet", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignor From City"
            margin="normal"
            fullWidth
            value={inputValues.consignorCity}
            onChange={(e) => {
              handleValues("consignorCity", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignor From Pincode"
            margin="normal"
            fullWidth
            value={inputValues.consignorPincode}
            onChange={(e) => {
              handleValues("consignorPincode", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignee To Name"
            margin="normal"
            fullWidth
            value={inputValues.consigneeName}
            onChange={(e) => {
              handleValues("consigneeName", e.target.value);
            }}
            select
          >
            {
              names.map((name) => {
                return (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                );
              })
            }
          </TextField>
        </Grid>
        <Grid>
          <TextField
            label="Consignee To Building Number"
            margin="normal"
            fullWidth
            value={inputValues.consigneeBuildingNum}
            onChange={(e) => {
              handleValues("consigneeBuildingNum", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignee To Street"
            margin="normal"
            fullWidth
            value={inputValues.consigneeStreet}
            onChange={(e) => {
              handleValues("consigneeStreet", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignee To City"
            margin="normal"
            fullWidth
            value={inputValues.consigneeCity}
            onChange={(e) => {
              handleValues("consigneeCity", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Consignee To Pincode"
            margin="normal"
            fullWidth
            value={inputValues.consigneePincode}
            onChange={(e) => {
              handleValues("consigneePincode", e.target.value);
            }}
            disabled
          />
        </Grid>
        <Grid>
          <TextField
            label="Way Bill / Permit No."
            margin="normal"
            fullWidth
            value={inputValues.wayBill}
            onChange={(e) => {
              handleValues("wayBill", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="GST No."
            margin="normal"
            fullWidth
            value={inputValues.gstNumber}
            onChange={(e) => {
              handleValues("gstNumber", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Special Instructions"
            margin="normal"
            fullWidth
            value={inputValues.specialInstructions}
            onChange={(e) => {
              handleValues("specialInstructions", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Contact Person / Mobile No."
            margin="normal"
            fullWidth
            value={inputValues.contactPerson}
            onChange={(e) => {
              handleValues("contactPerson", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={inputValues.vehicleReportingDate}
              onChange={(newValue) => {
                handleValues("vehicleReportingDate", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vehicle Reporting Date"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={inputValues.vehicleReportingTime}
              onChange={(newValue) => {
                handleValues("vehicleReportingTime", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vehicle Reporting Time"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={inputValues.vehicleDepartureDate}
              onChange={(newValue) => {
                handleValues("vehicleDepartureDate", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vehicle Departure Date"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={inputValues.vehicleDepartureTime}
              onChange={(newValue) => {
                handleValues("vehicleDepartureTime", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vehicle Departure Time"
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <TextField
            label="Driver Name"
            margin="normal"
            fullWidth
            value={inputValues.driverName}
            onChange={(e) => {
              handleValues("driverName", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Driver License Number"
            margin="normal"
            fullWidth
            value={inputValues.driverLicenseNumber}
            onChange={(e) => {
              handleValues("driverLicenseNumber", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Number of Packages"
            margin="normal"
            fullWidth
            value={inputValues.numOfPackages}
            onChange={(e) => {
              handleValues("numOfPackages", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Description of Goods"
            margin="normal"
            fullWidth
            value={inputValues.goodsDescription}
            onChange={(e) => {
              handleValues("goodsDescription", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Actual Weight"
            margin="normal"
            fullWidth
            value={inputValues.actualWeight}
            onChange={(e) => {
              handleValues("actualWeight", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Amount in Figures"
            margin="normal"
            fullWidth
            value={inputValues.amountInFigures}
            onChange={(e) => {
              handleValues("amountInFigures", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Amount in Words"
            margin="normal"
            fullWidth
            value={inputValues.amountInWords}
            onChange={(e) => {
              handleValues("amountInWords", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Document Number"
            margin="normal"
            fullWidth
            value={inputValues.documentNumber}
            onChange={(e) => {
              handleValues("documentNumber", e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={inputValues.documentDate}
              onChange={(newValue) => {
                handleValues("documentDate", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Document Date" margin="normal" />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [currentLR, setCurrentLR] = useState({});

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentLR(row);
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

  const deleteLRData = (id) => {
    setLoader(true);
    post(
      `${process.env.REACT_APP_API_URL}/lorry-receipt/delete`,
      { id: id },
      { withCredentials: true }
    )
      .then((apiResponseResult) => {
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
      })
      .catch((error) => {
        if (error.status !== undefined && error.data.message !== undefined) {
          setApiResponse({
            ...apiResponse,
            type: "error",
            message: error.data.message,
          });
        }
      });
  };

  const downloadLR = () => {
    setLoader(true);
    post(
      `${process.env.REACT_APP_API_URL}/lorry-receipt/download`,
      { currentLR },
      { withCredentials: true }
    )
      .then((res) => {
        var bytes = new Uint8Array(res.data.buffer.data); // pass your byte response to this constructor

        var blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
        
        var link=document.createElement('a');
        link.href=window.URL.createObjectURL(blob);
        link.download=`lorry-receipt_${currentLR.lr_number}.pdf`;
        link.click();

        setLoader(false);
      })
      .catch((error) => {
          setApiResponse({
            ...apiResponse,
            type: "error",
            message: "There was some problem while downloading file. Please try again later.",
          });
        setLoader(false);
      });
  }

  const actionOnMenu = (type) => {
    if (type === "view") {
      handleFullScreenModalOpen();
    } else if (type === "edit") {
      setInputValues({
        lrNumber: currentLR.lr_number,
        date: currentLR.date,
        vehicleNumber: currentLR.vehicle_number,
        vehicleType: currentLR.vehicle_type,
        driverMobile: currentLR.driver_mobile,
        consignorName: currentLR.consignor_name,
        consignorBuildingNum: currentLR.consignor_building_no,
        consignorStreet: currentLR.consignor_street,
        consignorCity: currentLR.consignor_city,
        consignorPincode: currentLR.consignor_pincode,
        consigneeName: currentLR.consignee_name,
        consigneeBuildingNum: currentLR.consignee_building_no,
        consigneeStreet: currentLR.consignee_street,
        consigneeCity: currentLR.consignee_city,
        consigneePincode: currentLR.consignee_pincode,
        wayBill: currentLR.way_bill,
        gstNumber: currentLR.gst_number,
        specialInstructions: currentLR.special_instructions,
        contactPerson: currentLR.contact_person,
        vehicleReportingDate: currentLR.vehicle_reporting_date,
        vehicleReportingTime: currentLR.vehicle_reporting_time,
        vehicleDepartureDate: currentLR.vehicle_departure_date,
        vehicleDepartureTime: currentLR.vehicle_departure_time,
        driverName: currentLR.driver_name,
        driverLicenseNumber: currentLR.driver_license_number,
        numOfPackages: currentLR.num_of_packages,
        goodsDescription: currentLR.goods_descriptiion,
        actualWeight: currentLR.actual_weight,
        amountInFigures: currentLR.amount_in_figures,
        amountInWords: currentLR.amount_in_words,
        documentNumber: currentLR.document_number,
        documentDate: currentLR.document_date,
      });
      isEditButtonClicked.current = true;
    } else if (type === "delete") {
      setDeleteConfirmModal(true);
    } else if (type === "download") {
      downloadLR();
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
            actionOnMenu("view");
          }}
        >
          <VisibilityIcon style={{ marginRight: "0.5rem" }} /> View
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionOnMenu("edit");
          }}
        >
          <EditIcon style={{ marginRight: "0.5rem" }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionOnMenu("download");
          }}
        >
          <FileDownloadIcon style={{ marginRight: "0.5rem" }} /> Download LR
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

  const [fullScreenModalOpen, setFullScreenModalOpen] = useState(false);

  const handleFullScreenModalOpen = () => {
    setFullScreenModalOpen(true);
  };

  const handleFullScreenModalClose = () => {
    setFullScreenModalOpen(false);
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
            Lorry Receipts
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
            title={"Create New Lorry Receipt"}
            content={renderForm}
            buttonText={"Create"}
          />

          <ModalBuilder
            open={editModal}
            handleOpen={handleEditOpen}
            handleClose={handleEditClose}
            handleSubmit={handleEditSubmit}
            title={"Edit Lorry Receipt"}
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
              deleteLRData(currentLR._id);
            }}
          />

          <FullScreenModal
            fullScreenModalOpen={fullScreenModalOpen}
            handleFullScreenModalOpen={handleFullScreenModalOpen}
            handleFullScreenModalClose={handleFullScreenModalClose}
            content={<ViewLRDialogBox data={currentLR} />}
          />

          {data.length > 0 ? (
            <TableBuilder
              rows={data}
              tableHeaders={["#", "LR No.", "Vehicle No.", "Date", "Action"]}
              columns={[
                { key: "lr_number" },
                { key: "vehicle_number" },
                {
                  key: "date",
                  render: true,
                  renderValue: (row, key) => {
                    return format_date(
                      row[key],
                      "Asia/Kolkata",
                      "dd-MMMM-yyyy"
                    );
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
          ) : (
            <DataNotFound />
          )}
          <MoreOptions />
        </Grid>
      </Grid>
    </>
  );
};

export default LorryReceipt;
