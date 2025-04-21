// components/ZoomMeeting.jsx
"use client";
import { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import axios from "axios";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.15.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const ZoomMeeting = ({ session, role }) => {
  useEffect(() => {
    const startMeeting = async () => {
      const response = await axios.post("http://amd-api.code4bharat.com/api/zoom/generate-signature", {
        meetingNumber: session.zoomMeetingId, // ensure this exists
        role: role === "expert" ? 1 : 0,
      });

      ZoomMtg.init({
        leaveUrl: "http://localhost:3000/video-call",
        success: () => {
          ZoomMtg.join({
            signature: response.data.signature,
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
            meetingNumber: session.zoomMeetingId,
            userName: `${session.firstName} ${session.lastName}`,
            passWord: session.zoomPassword || "", // optional
            success: () => console.log("Joined Zoom"),
            error: (err) => console.error("Join Error", err),
          });
        },
        error: (err) => console.error("Init Error", err),
      });
    };

    startMeeting();
  }, [session, role]);

  return <div id="zmmtg-root"></div>;
};

export default ZoomMeeting;
