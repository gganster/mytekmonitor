import Chart from "react-apexcharts";
import React from 'react';
import moment from "moment";

const CpuGraph = ({data}) => {
    return(
        <div>
            <p>
                Graphique de l'utilisation du cpu 
                ({data.cpu.idle ? (100-data.cpu.idle).toFixed(2) : 0}%)
            </p>
            <Chart  
            options =
            {{
                labels : ["utilisé"],
                plotOption : 
                {
                    radialBar:
                    {
                        startAngle: -90,
                        endAngle: 90,
                       track: 
                       {
                            background: "#e7e7e7",
                            strokeWidth: '97%',
                            margin: 5, // margin is in pixels
                            dropShadow: 
                            {
                              enabled: true,
                              top: 2,
                              left: 0,
                              color: '#999',
                              opacity: 1,
                              blur: 2
                            }
                        }
                    }
                }
            }}

                series={[data.cpu.idle ? (100-data.cpu.idle).toFixed(2) : 0]}
                type="radialBar"
                // height="50"
                width="250"
            />
            Sur un total de {data.cpu.cpucore ? data.cpu.cpucore : "Non acquis" } coeur logique
        </div>
)}

const MemGraph = ({data}) => {

    return(
        <div>
            <p>
              Utilisation de la Mémoire ({data.memory.total ? (data.memory.total/1e9).toFixed(2) : 0 }Go)  {/*On divise par 1e9 pour ramener le total en Go*/}
            </p>
            <Chart  
            options={{
                labels : ["Utilisé"],
                plotOption : 
                {
                    startAngle : -90,
                    endAngle: 90
                }
            }}

                series={[data.memory.percent ? data.memory.percent : 0]}
                type="radialBar"
                // height="50"
                width="250"
            />
        </div>
)}

const ListDisk = ({data}) => {
    return(
        <div>    
          Liste des disques 
          {data.diskIo.map 
          (i => 
            <li key={i.disk_name}>
                {i.disk_name}
            </li>
          )}
    </div>

    )
}

const ListProcess = ({data}) => {
    return(
        <div>    
          Liste des Applications
          {data.amps.map 
          (i => 
            <li key={i.key}>
                {i.name}
            </li>
          )}
    </div>

    )
}

const UpTime = ({data}) => {
    return (
      <div>
        {data.upTime}
      </div>
    )
}



const LocalHour = ({data}) => {
    return (
      <div>
        {data.localHour}< br/>
        Format local de la date : {moment.locale()}, 
        {console.log(moment(data.localHour).format('llll'))} {/**Prend pas la props */}
        <br/>
        {data.localHour ? moment(data.localHour).format("DD MM YYYY") : "Error"}
      </div>
    )
}

const GlobalInfo = ({data}) => {
    return(
          <div>
            OS : {data.sysInfo.hr_name} <br/>
            La machine {data.sysInfo.hostname} est allumé depuis : <br/>
            <UpTime data={data} />
            Il est :
            <LocalHour data={data} /> pour la machine
          </div>
    )
}

const CpuGraphDetail = ({data}) => {  //tentative de graph avec plusieur bar ou plusieur de graph (moins bien)
    return(
        <div>
            <p>
                Détails de l'utilisation du cpu 
                ({data.cpu.cpucore ? data.cpu.cpucore : "Non acquis" } coeur)
            </p>
            <Chart
                options =
                {{
                  plotOptions: {
                    bar: {
                      borderRadius: 5,
                      horizontal: false,
                    }
                  },
                  chart: {
                    id: "basic-bar"
                  },
                   xaxis: {
                    categories: data.quickLook.percpu ? data.quickLook.percpu.map(i => i.cpu_number) : [0]
                  }
                }}
                series={[{name : "Details" ,data : data.quickLook.percpu ? data.quickLook.percpu.map(i => i.total) : [0] }]}
                type="bar"
                width="350"
              />
        </div>
)}

export {CpuGraph, CpuGraphDetail, MemGraph, ListDisk, ListProcess, UpTime, LocalHour, GlobalInfo, };


/**
 * 
 * data.quickLook.percpu ? data.quickLook.percpu.map(i => i.total) : 
 * <Chart  
 * options =
 * {{
 *     labels : [data.quickLook.percpu ? data.quickLook.percpu.map(i => i.cpu_number) : ["0","0","0","0","0","0","0","0"]],
 *     plotOption : 
 *     {
 *         radialBar:
 *         {
 *             startAngle: -90,
 *             endAngle: 90,
 *         }
 *     }
 * }}
 * 
 *     series={ data.quickLook.percpu ? data.quickLook.percpu.map(i => i.total) : [0,0,0,0,0,0,0,0]}
 *     type="radialBar"
 *     // height="50"
 *     width="250"
 * />
 *  <p>
             N° {data.quickLook.percpu ? data.quickLook.percpu.map(i => i.cpu_number) : [0]}<br/>
             Donnée {data.quickLook.percpu ? data.quickLook.percpu.map(i => i.total) : [0]}

            </p>
 * 
*/