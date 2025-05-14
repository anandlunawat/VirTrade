import { printLogs } from './logs';

export const stocks = async () => {
    try {
        const res = await fetch(`http://localhost:5000/stocks`);
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
