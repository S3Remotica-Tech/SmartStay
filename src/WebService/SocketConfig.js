import SockJS from "sockjs-client";
import { over } from "stompjs";
import ConfigV2 from "./ConfigV2";

let stompClient = null;
// https://webdevapi.qbatz.com/ws
export const Connect = (onMessageReceived, paymentId) => {
  const socket = new SockJS(ConfigV2.apiBaseUrl + "/ws");
  stompClient = over(socket);

 
  if (paymentId) {
    stompClient.connect({}, () => {
      
      stompClient.subscribe(`/payments/${paymentId}`, (message) => {
                onMessageReceived(message);
      });
    });
  }
};
