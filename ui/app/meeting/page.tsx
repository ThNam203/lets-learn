"use client";

import GLOBAL from "@/global";
import {
    ConnectionState,
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useConnectionState,
    useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const [token, setToken] = useState("");

    useEffect(() => {
        fetch(
            GLOBAL.API_URL + `/v1/meeting/room_meeting?username="abc"`,
            {
                method: "POST",
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    toast.error("Failed to get token");
                }
            })
            .then((data) => {
                setToken(data.token);
            })
            .catch((err) => toast.error("Failed to create room"));
    }, []);

    if (!token) {
        return <div>Loading...</div>;
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: "100dvh" }}
        >
            <ConnectionState />
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
            <ControlBar />
        </LiveKitRoom>
    );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );
    return (
        <GridLayout
            tracks={tracks}
            style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
        >
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}
