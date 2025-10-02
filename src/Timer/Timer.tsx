import { useState, useEffect, useRef } from "react";
import DisplayTimer from "./DisplayTimer";
import useRouteHomePage from "../useRouteHomepage";
import Panel from "../HomePage/Panel";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const alarmSound = useRef(new Audio("/TimerSound.wav"));
  const [soundOn, setSoundOn] = useState(true); // ✅ sound toggle state
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // ✅ Fix: give ref a proper type
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useRouteHomePage();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => {
    if (time <= 0) return;
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    // ✅ Clear any existing interval safely
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
            alarmSound.current.currentTime = 0;
            if (soundOn) alarmSound.current.play();

            // ✅ Send notification if tab is inactive
            if (Notification.permission === "granted") {
              new Notification("Time's up!", {
                body: "Your timer has finished.",
                icon: "/alien-egg-yellow.svg",
              });
            } else if (Notification.permission !== "denied") {
              // Ask for permission once
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification("Time's up!", {
                    body: "Your timer has finished.",
                    icon: "/alien-egg-yellow.svg",
                  });
                }
              });
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // ✅ Cleanup interval when unmounting or stopping
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, soundOn]);

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  return (
    <div>
      <DisplayTimer
        time={time}
        setTime={setTime}
        setInitialTime={setInitialTime}
        isRunning={isRunning}
        handleStart={handleStart}
        handlePause={handlePause}
        handleReset={handleReset}
        soundOn={soundOn}
        toggleSound={toggleSound}
      />
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
    </div>
  );
}
