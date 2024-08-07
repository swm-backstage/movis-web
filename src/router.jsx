import { createBrowserRouter } from "react-router-dom";
import EventOutlet from "./event/EventOutlet";
import EventNavContainer from "./event/EventNavContainer";
import EventInfo from "./event/eventInfo/EventInfo";
import LandingPage from "./landingPage/LandingPage";
import EventUnclassified from "./event/eventUnclassified/EventUnclassified";
import TestPage from "./testPage/TestPage";

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
        path: "test",
        element: <TestPage />
    }
]);