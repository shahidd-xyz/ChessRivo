'use client'

import { io } from "socket.io-client";

const socket = io("https://chessrivo.onrender.com", {
    withCredentials: true,
});

export default socket;