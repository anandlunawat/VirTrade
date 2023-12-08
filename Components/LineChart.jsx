import { useEffect, useState } from "react"
import Chart from "chart.js/auto"
import { historicalData } from "../actions/historicalData"

export default function LineChart(props) {

    const [data,setData] = useState([{}])
    const [time,setCurrentTime] = useState()
    const currentDate = new Date()

    useEffect(()=>{        
        const line_Chart = new Chart(
            document.getElementById('chart_js'),
            {
                type: 'line',
                data: {
                    labels: data.map(row => row.time),
                    datasets: [
                        {
                            label: 'Crude Oil',
                            data: data.map(row => row.price)
                        }
                    ]
                },
                options: {                
                    responsive: true,
                    maintainAspectRatio: true
                }
            }
        );

        console.log("lin_Chart", line_Chart.data)
        return () => line_Chart.destroy()
    },[data])
    
    return (        
        <canvas height={"200px"} id="chart_js"></canvas>
    )
}