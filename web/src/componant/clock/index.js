import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className="text-light"
      style={{ marginRight: "5px", marginLeft: "5px" }}
    >
      {time.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
};

export default Clock;
