import SockJS from "sockjs-client";
import { over } from "stompjs";
 
let stompClient = null;
// https://webdevapi.qbatz.com/ws
export const Connect = (onMessageReceived, paymentId) => {
    const socket = new SockJS("https://webdevapi.qbatz.com/ws");
    stompClient = over(socket);
 
    console.log(paymentId)
    if (paymentId) {
        stompClient.connect({}, () => {
        console.log(`/payments/${paymentId}`)
        stompClient.subscribe(`/payments/${paymentId}`, (message) => {
            onMessageReceived(message);
        });
    });
    }
    
};