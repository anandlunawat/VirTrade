import { useEffect, useState } from "react"
import Chart from "chart.js/auto"
import { historicalData } from "../actions/historicalData"

export default function LineChart() {

    const [data,setData] = useState()

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await historicalData()
                setData(response)
            }
            catch(e) {
                console.log("Error fetching historical Data",e)
            }
        }
        fetchData()
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    },[])

    useEffect(() => {
        const line_Chart = new Chart(
          document.getElementById('chart_js'),
          {
            type: 'line',
            data: {
              labels: data?.map(row => row[0].match(/\d{2}:\d{2}/)),
              datasets: [
                {
                  label: 'SBIN',
                  data: data?.map(row => row[2])
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              pointRadius: 0
            }
          }
        );
      
        console.log("line_Chart", line_Chart.data);
      
        return () => line_Chart.destroy();
      }, [data]);
      
    
    return (        
        <canvas height={"200px"} id="chart_js"></canvas>
    )
}