import { Spinner } from "hydrogen";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Loading;