import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function InstancePage() {
  const { instance } = useParams();

  useEffect(() => {
    axios.get("instance", { instance }).then(({ dataR }) => {
      setData(dataR);
    });
  }, []);
  return <>Your instance {instance}</>;
}
