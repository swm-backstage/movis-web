import { createBrowserRouter } from "react-router-dom";
import EventOutlet from "./event/EventOutlet";
import EventNavContainer from "./event/EventNavContainer";
import EventInfo from "./event/eventInfo/EventInfo";
import LandingPage from "./landingPage/LandingPage";
import EventUnclassified from "./event/eventUnclassified/EventUnclassified";
import TestPage from "./testPage/TestPage";
import InvitePage from "./invitePage/InvitePage";
import EntryPage from "./entryPage/EntryPage";
import EntryPageForApp from "./entryPage/EntryPageForApp";

export default createBrowserRouter([
    {
        path: "/",
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
        path: "/entry/:entryCode",
        element: <EntryPage />
    },
    {
        path: "test",
        element: <TestPage />
    }
]);