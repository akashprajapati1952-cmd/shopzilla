import { useEffect, useState, type JSX } from "react";


export default function Countdown(): JSX.Element {

  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {

    if (seconds <= 0) return;

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setSeconds((prev: number) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds]);

  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  return (
    <div>
   {seconds}s
   
    </div>
  );
}
