import * as Network from 'expo-network';
//temporary URL
async function getIP() {
    let ipAddress = null;
    const ip = await Network.getIpAddressAsync()
    return `http://${ip}:3000`;
}
export const HOST_URL = getIP;
