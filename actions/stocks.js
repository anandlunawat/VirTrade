export const stocks = async () => {
    try {
        const res = await fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
        if(!res.ok) {
            console.log("Response Error")
        }
        const data = res.json()
        return data
    }
    catch(e) {
        console.log("Error",e)
    }
}