import {Card} from "hydrogen"
import useInstance from "contexts/instance";
import useData from "hooks/useData";

const Overview = () => {
  const [instance] = useInstance();
  const data = useData(instance.value);

  return (
    <div className="">
      <Card>
        <h3 className="">current instance: {instance.label} ({instance.value})</h3>
      </Card>
      <Card>
        <div>
          Ceci est une seconde carte
          {data.cpu.idle}
        </div>
      </Card>
    </div>
  )

}

export default Overview;