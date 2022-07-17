import React from "react";
import { Switch, Route } from "react-router-dom";
import Grid from '@mui/material/Grid';

import Login from "./Login";
import Dashboard from "./Dashboard";
import CareerPage from "./CareerPage";
import LRMainComponent from "./LRAndTracking";

const Routes = () => {
    return (
        <Grid style={{ padding: "1rem 2rem" }}>
            <Switch>

				{/* For now only, remove after auth part is developed */}
				<Route path="/login">
					<Login />
				</Route>

                <Route path="/dashboard">
					<Dashboard />
				</Route>

				<Route path="/lr">
					<LRMainComponent />
				</Route>

				<Route path="/career">
					<CareerPage />
				</Route>

				{/* <Route
					path="/dashboard/freight_forwarding"
					component={FreightForwarding}
				></Route>

				<Route path="/dashboard/custom_clearance">
					<CustomClearance />
				</Route>

				<Route path="/dashboard/transportation_management">
					<TransportationManagement />
				</Route>

				<Route path="/dashboard/warehouse_management">
					<WarehouseManagement />
				</Route>

				<Route path="/dashboard/value_added_services">
					<ValueAddedServices />
				</Route>

				<Route path="/dashboard/search">
					<SearchResult />
				</Route>

				<Route
					path="/dashboard/showFreightData"
					component={ShowFreightData}
				></Route>

				<Route
					path="/dashboard/showCustomData"
					component={ShowCustomData}
				></Route>

				<Route
					path="/dashboard/showTransportData"
					component={ShowTransportData}
				></Route>

				<Route
					path="/dashboard/showWarehouseData"
					component={ShowWarehouseData}
				></Route>

				<Route
					path="/dashboard/showValueAddedData"
					component={ShowValueAddedData}
				></Route>

				<Route
					path="/dashboard/changeStatus"
					component={ChangeStatus}
				></Route>

				<Route
					path="/dashboard/editFreightData"
					component={EditFreightData}
				></Route>

				<Route
					path="/dashboard/editCustomData"
					component={EditCustomData}
				></Route>

				<Route
					path="/dashboard/editTransportData"
					component={EditTransportData}
				></Route>

				<Route
					path="/dashboard/editWarehouseData"
					component={EditWarehouseData}
				></Route>

				<Route
					path="/dashboard/editValueAddedData"
					component={EditValueAddedData}
				></Route>

				<Route path="/dashboard/manage_shipment_tracking" component={ManageShipmentTracking}>
				</Route>

				<Route>
					<ErrorNotFound />
				</Route>                 */}
            </Switch>
        </Grid>        
    );
};

export default Routes;