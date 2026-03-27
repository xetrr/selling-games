import { useParams } from "react-router-dom";
import Placeholder from "./Placeholder";

export default function GameDetail() {
  const { id } = useParams();

  return (
    <Placeholder
      title={`Game: ${id}`}
      description="Detailed information and download options for this game"
    />
  );
}
