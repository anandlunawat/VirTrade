import { useEffect, useState } from "react"
import Chart from "chart.js/auto"

export default function LineChart(props) {

    const [data,setData] = useState([{
        time : new Date().getHours(),
        price : 6670
    }])

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
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: true
                }
            }
        );

        console.log("lin_Chart", line_Chart.data)
        return () => line_Chart.destroy()
    },[])
    
    // setInterval(()=>{        
    //     console.log("In Interval",data)
    //     setData((preValue)=>[
    //         ...preValue,
    //         {time : props.chartN?.slice(-1)[0]?.time, price : props.chartN?.slice(-1)[0]?.price}            
    //     ])
    // },120000)
    
    return (        
        <canvas id="chart_js"></canvas>
    )
}