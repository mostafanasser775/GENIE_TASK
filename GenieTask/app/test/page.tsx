'use client';
import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_URL = "ws://localhost:8000/ws/chat/";

const WebSocketComponent: React.FC = () => {
    // const [message, setMessage] = useState<string>("");
    // const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    //     shouldReconnect: () => true, // Auto-reconnect on disconnect
    // });

    // const handleSendMessage = () => {
    //     if (message.trim()) {
    //         sendMessage(JSON.stringify({ message }));
    //         setMessage("");
    //     }
    // };

    return (
        <></>
        // <div className="p-4 border rounded shadow-md w-96">
        //     <p className="mb-2 text-gray-600">
        //         Status: {readyState === ReadyState.OPEN ? "Connected" : "Disconnected"}
        //     </p>
        //     <input
        //         type="text"
        //         value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //         className="w-full p-2 mb-2 border"
        //         placeholder="Type a message..."
        //     />
        //     <button
        //         onClick={handleSendMessage}
        //         disabled={readyState !== ReadyState.OPEN}
        //         className="w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
        //     >
        //         Send
        //     </button>
        //     <p className="mt-2 text-green-600">
        //         Last Message: {lastMessage ? JSON.parse(lastMessage.data).message : "No messages yet"}
        //     </p>
        // </div>
    );
};

export default WebSocketComponent;
