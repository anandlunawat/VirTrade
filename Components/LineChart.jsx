import { useEffect, useState } from "react"
import Chart from "chart.js/auto"

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


    useEffect(()=>{

        const time1 = setInterval(() => {        
            setCurrentTime(currentDate.getMinutes())
        }, 60000);

        const interval = setInterval(()=>{
            if(currentDate.getMinutes()-1===time) {
                console.log("In if",time)
                setCurrentTime(currentDate.getMinutes())
                setData((preValue)=>[
                    ...preValue,
                    {time : props.chartN?.slice(-1)[0]?.time, price : props.chartN?.slice(-1)[0]?.price}            
                ])
            }
        })

        return () => {clearInterval(time1);clearInterval(interval)}

    },)

    // setInterval(() => {        
    //     setCurrentTime(currentDate.getMinutes())
    // }, 60000);
    
    // setInterval(()=>{        
    //     console.log("In Interval",data)
    //     // if(props.chartN?.slice(-1)[0]?.price !== undefined && currentDate.getMinutes()-2===time) {
    //     if(currentDate.getMinutes()-1===time) {
    //         console.log("In if",time)
    //         setCurrentTime(currentDate.getMinutes())
    //         setData((preValue)=>[
    //             ...preValue,
    //             {time : props.chartN?.slice(-1)[0]?.time, price : props.chartN?.slice(-1)[0]?.price}            
    //         ])
    //     }
    // },60000)
    
    return (        
        <canvas height={"200px"} id="chart_js"></canvas>
    )
}