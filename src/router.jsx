import { createBrowserRouter } from "react-router-dom";
import EventOutlet from "./event/EventOutlet";
import EventNavContainer from "./event/EventNavContainer";
import EventInfo from "./event/eventInfo/EventInfo";
import LandingPage from "./landingPage/LandingPage";
import EventUnclassified from "./event/eventUnclassified/EventUnclassified";
import TestPage from "./testPage/TestPage";
import InvitePage from "./invitePage/InvitePage";
import EntryPageForApp from "./entryPage/EntryPageForApp";
import Mobile from "./styles/Mobile";

export default createBrowserRouter([
    {
        path: "/",
        element: <Mobile/>,
        children: [
            {
                path: "",
                element: <LandingPage />
            },
            {
                path: "clubs/:clubId",
                element: <EventOutlet />,
                children: [
                    {
                        path: "",
                        element: <EventNavContainer />
                    },
                    {
                        path: "events/:eventId",
                        element: <EventInfo />
                    },
                    {
                        path: "events/unclassified",
                        element: <EventUnclassified />
                    }
                ]
            },
            {
                path: "clubs/:clubId/app",
                element: <EntryPageForApp />
            },
            {
                path: "/invite/:inviteCode",
                element: <InvitePage />
            },
            {
                path: "test",
                element: <TestPage />
            }
        ]
    }
]);