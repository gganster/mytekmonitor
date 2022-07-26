import Chart from "react-apexcharts";
import React, { useState, useEffect, useTransition } from 'react';

const graphData = (data) => {
    console.log(data)
    const {cpu,memory, ip, quickLook, sysInfo, upTime, systemCount, localHour, diskIo ,amps, loading, error } = data 

     /*   const [optionCPU,setOptionCPU] = useState({});
        const [serieCPU,setSerieCPU] = useState([]);

    useEffect(() => {
        setOptionCPU({
            Chart: {
              id: 'cpuGraph',
              offsetY: -20,
              sparkline: {
                enabled: true
              }
            }});
        setSerieCPU(cpu.idle);
        
    });
        */

    const CpuGraph =
    <div>
        <p>Graphique de l'utilisation du cpu ({cpu.idle})</p>

        <Chart  
           options={{ labels : (["Disponible"])}}

           plotOption =  {{
            startAngle: -90,
            endAngle: 90}}

            series={[cpu.idle]}
            type="radialBar"
            // height="50"
            width="250"
        />
        
    </div>

    
    return {CpuGraph};
}

export default graphData;
