import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

interface AppState {
  is24HourFormat: boolean;
}

const defaultAppState: AppState = {
  is24HourFormat: true,
};

interface AppContextValue extends AppState {
  setState: (state: AppState) => void;
}

export const AppContext = createContext<AppContextValue>({
  ...defaultAppState,
  setState: () => {},
});

const Home = () => {
  const [appState, setAppState] = useState(defaultAppState);
  const router = useRouter();

  return (
    <AppContext.Provider value={{ ...appState, setState: setAppState }}>
      Welcome to the Habit Tracker
      <button onClick={() => router.push("/today")}>Today</button>
    </AppContext.Provider>
  );
};

export default Home;
