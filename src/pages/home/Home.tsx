import PointRegisterCard from "../../components/PointRegisterCard";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const handleRoute = (path: string) => navigate(path);
  const onClickLogout = () => {
    handleRoute("/");
  };
  return (
    <>
      <div
        className="mapouter"
        style={{
          position: "relative",
          textAlign: "right",
          height: "500px",
          width: "600px",
        }}
      >
        <div
          className="gmap_canvas"
          style={{
            overflow: "hidden",
            background: "none!important",
            height: "500px",
            width: "600px",
          }}
        >
          <br />
        </div>
      </div>
      ;
      <IconButton
        isRound
        colorScheme={"blue"}
        margin={"0.5em"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house-door"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
          </svg>
        }
        onClick={() => {
          onClickLogout();
        }}
        aria-label={"back-icon"}
      />
      <PointRegisterCard
        user={{ name: "Igor Itiroko", role: "internship", team: "IT exp" }}
      ></PointRegisterCard>
    </>
  );
}
