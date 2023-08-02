export const stocks = async () => {
    // fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')    
    // .then(response => response.json())
    // .then(data => {console.log(data);return data})
    // .catch(error => console.log(error))
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