import { createBrowserRouter } from "react-router-dom";
import EventOutlet from "./event/EventOutlet";
import EventNavContainer from "./event/EventNavContainer";
import EventInfo from "./event/eventInfo/EventInfo";

export default createBrowserRouter([
    {
        path: "/",
        element: <>정상 실행중~</>
    },
    {
        path: "/events",
        element: <EventOutlet />,
        children: [
            {
                path: "",
                element: <EventNavContainer />
            },
            {
                path: "info",
                element: <EventInfo />
            }
        ]
    }
]);