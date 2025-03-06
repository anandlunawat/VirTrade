export const stocks = async () => {
    try {
        const res = await fetch(`http://localhost:5000/stocks`);
        if (!res.ok) {            
            console.log("Response Error");
            return null;
        }
        const data = await res.json();
        return data;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
};
