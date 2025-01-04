import "./awsner.css"

export const Awsners = ({ data }: any) => {

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
            <li key={id}>
              <p className="awsner-text">{awsner.text}</p>
              <p className="awsner-date">{formatTimestamp(awsner.date)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
