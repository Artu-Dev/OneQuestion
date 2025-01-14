import "./awsner.css"
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

export const Awsners = ({ data, onLikeAwsner }: any) => {
  const sessionID = localStorage.getItem("sessionID")
  function formatTimestamp(timestamp: number) {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 3600) {
      if (diff < 60) {
        return `agora mesmo`;
      } else {
        const minutes = Math.floor(diff / 60);
        return `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
      }
    }

    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="awsners-container">
      <h1>Respostas</h1>
      <ul>
        {data.map((awsner: any, id: any) => {
          return (
            <li key={id} onClick={() => onLikeAwsner(awsner.sessionID)}>
              <p className="awsner-text">{awsner.text}</p>
              <p className="awsner-date">{formatTimestamp(awsner.date)}</p>
              <p className={`likeBtn ${awsner.like ? "liked" : ""}`}>
                {
                  awsner.likes?.includes(sessionID)? <GoHeartFill/> : <GoHeart />
                }
                <span className="likeNumber">{awsner.likes?.length || 0}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
