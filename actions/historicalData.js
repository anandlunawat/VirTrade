import axios from "axios";

export const historicalData = async () => {
    var data = JSON.stringify({"exchange":"NSE","symboltoken":"11377",
    "interval":"ONE_MINUTE","fromdate":"2023-10-05 09:15",
    "todate":"2023-10-05 09:16"});
    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData',
        headers: { 
          'X-PrivateKey': 'Sl9Epcld', 
          'Accept': 'application/json, application/json', 
          'X-SourceID': 'WEB, WEB', 
          'X-ClientLocalIP': '192.168.1.10', 
          'X-ClientPublicIP': '192.168.43.134', 
          'X-MACAddress': '14-18-C3-33-66-CA', 
          'X-UserType': 'USER', 
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUpRTXpNME5EWXdJaXdpWlhod0lqb3hOamsyTnpBME1qTTNMQ0pwWVhRaU9qRTJPVFkyTVRReU5URXNJbXAwYVNJNklqWmhaRFF3T0dVM0xXRmlZVE10TkROaFlpMWhabUUyTFRRNE9XSTBabU0xTjJVMU55SXNJbTl0Ym1WdFlXNWhaMlZ5YVdRaU9qTXNJbk52ZFhKalpXbGtJam9pTXlJc0luVnpaWEpmZEhsd1pTSTZJbU5zYVdWdWRDSXNJblJ2YTJWdVgzUjVjR1VpT2lKMGNtRmtaVjloWTJObGMzTmZkRzlyWlc0aUxDSm5iVjlwWkNJNk15d2ljMjkxY21ObElqb2lNeUo5LjRYdHc0d1hrdWJjZGxCUWxBdUNtMnE5OHpkN0JjZjhpWlpqVkJ1anFPNzd5cnlmUm5IblU0b2NmTVpjcDVtdWNXTU53dVN0cjB6M01OWEczY2hGMUpRIiwiaWF0IjoxNjk2NjE0MzExLCJleHAiOjE2OTY3MDA3MTF9.trfmb1bhky_MEtQn63bVox0FOokuH5qe0r9LDcpU0VDy7Uo5ScTfb3kt0-5w5z_moWLI7oR38lU9zPLR0VnKHA', 
          'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        const {data} = await axios(config)
        console.log("Line 27",data)
    }
    catch(e) {
        console.log("Error",e)
    }
}
