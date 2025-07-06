import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";

const History = () => {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {}
    };

    fetchHistory();
  }, []);

  return (
    <div className="History">
      {meetings === null ? (
        <>
          <p>There is no History yet</p>
        </>
      ) : (
        <>
          <div>
            <p>History</p>
            {meetings.map((meeting) => {
              console.log(meeting);
            })}
          </div>
        </>
      )}

      {console.log(meetings)}
      <p>This is the Hsitory Page </p>
    </div>
  );
};

export default History;
