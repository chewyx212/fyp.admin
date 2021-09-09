import { Flex, Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SideNav from "./../components/SideNav";
import MainPage from "./MainPage";
import OrganizationPage from "./OrganizationPage";
import DeskPage from "./DeskPage";
import RoomPage from "./RoomPage";
import CreateOrganizationPage from "./CreateOrganizationPage";
import VisitorPage from "./Visitor/VisitorPage";
import VisitorInvitePage from "./Visitor/VisitorInvitePage";
import { Route, Switch } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [showNav, setShowNav] = useState(true);


  return (
        <SideNav>
          <Box flex="1">
            <Switch>
              <Route path="/" exact>
                <MainPage />
              </Route>
              <Route path="/organization" exact>
                <OrganizationPage />
              </Route>
              <Route path="/desk">
                <DeskPage />
              </Route>
              <Route path="/room">
                <RoomPage />
              </Route>
              <Route path="/visitor" exact>
                <VisitorPage />
              </Route>
              <Route path="/visitor/invites" exact>
                <VisitorInvitePage />
              </Route>
              <Route path="/create-organization">
                <CreateOrganizationPage />
              </Route>
            </Switch>
          </Box>
        </SideNav>
  );
};
export default Dashboard;
