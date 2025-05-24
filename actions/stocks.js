import { printLogs } from './logs';

export const stocks = async () => {
    try {
        const res = await fetch(`https://vir-backend.onrender.com/stocks`);
        if (!res.ok) {            
            printLogs("Response Error");
            return null;
        }
        const data = await res.json();
        return data;
    } catch (e) {
        printLogs("Error", e);
        return null;
    }
};
