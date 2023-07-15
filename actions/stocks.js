export const stocks = () => {
    fetch('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')    
    .then(response => response.json())
    .then(data => {console.log(data);return data})
    .catch(error => console.log(error))
}