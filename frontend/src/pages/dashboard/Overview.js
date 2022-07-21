import {Card} from "hydrogen"
import useData from "useData";


const Overview = () => {
 // const [url, setUrl] =useContext(urlContexte);
 // const data = useData(url);
 // const {CpuGraph} = graphData(data); //ici on recupere le graph Cpu
 // {cpu,memory, ip, quickLook, sysInfo,upTime,systemCount,localHour, diskIo, amps, loading, error} = data decomposition
  return (
    <div className="">
      <Card>
        <h3 className="">Hello</h3>
      </Card>
      <Card>
        <div>
          Ceci est une seconde carte
        </div>
      </Card>
    </div>
  )

}

export default Overview;