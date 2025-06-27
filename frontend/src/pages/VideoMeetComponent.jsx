

import "../styles/VideoMeetComponent.css";
import { useRef, useState } from "react";

const server_url = "http://localhost:8000";
var connections = {};

const peerConfigConnectons = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  var socketRef = useRef();
  var socketIdRef = useRef();

  let localVideoRef = useRef();
  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState();
  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();
  let [showModel, setShowModel] = useState();
  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);

  let [askForUserName, setAskForUserName] = useState(true);
  let [userName, setUserName] = useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = useState([]);

  // TODO
  // if(isChrome === false) {

  // }

  return (
    <div className="VideoMeetComponent">
      {askForUserName === true ? 
        <div>
            This islkjhghjk
        </div> 
        : 
        <></>
      }
    </div>
  );
}
