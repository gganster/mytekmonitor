import {Card, Divider} from "hydrogen"
import useInstance from "contexts/instance";
import useData from "hooks/useData";
import {CpuGraph, MemGraph, ListDisk, ListProcess, UpTime, LocalHour, GlobalInfo,  CpuGraphDetail} from "components/graphData";

const Overview = () => {
  const [instance] = useInstance();
  const data = useData(instance.value);
 // const {cpuGraph} = graphData(data); //for later
  console.log((data))
  return (
    <div className="">
      <Card>
        <h3 className="">current instance: {instance.label} ({instance.value})</h3>
      </Card>
      <Card className="border-r">
        <GlobalInfo data={data} />
      </Card>

      {/*<Divider className="divide-x-2">*/}
      <Card>
          <div style={{display:"flex", gap:20}}>
            <CpuGraph data={data}/>
            <MemGraph data={data} />
            <CpuGraphDetail data={data} />
            {console.log(data.quickLook.percpu ? data.quickLook.percpu.map(i => i.cpu_number) : "0")}
          </div>
      </Card>

      <Card className="border-l">
        <div style={{display:"flex", gap:50}}>
          <ListDisk data={data}/>
          <ListProcess data={data}/>
        </div>
      </Card>
    </div>
  )

}

export default Overview;