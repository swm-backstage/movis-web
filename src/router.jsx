import { createBrowserRouter } from "react-router-dom";
import EventOutlet from "./event/EventOutlet";
import EventNavContainer from "./event/EventNavContainer";
import EventInfo from "./event/eventInfo/EventInfo";
import LandingPage from "./landingPage/LandingPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "events",
        element: <EventOutlet />,
        children: [
            {
                path: "",
                element: <EventNavContainer />
            },
            {
                path: ":id",
                element: <EventInfo />
            }
        ]
    }
]);