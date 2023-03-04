import {
  useState,
  MouseEventHandler,
  FC,
  ReactNode,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";

type ICounterContextProvider = { value: number };
type ICounterProps = { value: number };

type ICounterContext = {
  value: number;
  minus: () => void;
  plus: () => void;
};

const CounterContext = createContext<ICounterContext | null>(null);

const CounterContextProvider: FC<PropsWithChildren<ICounterContextProvider>> = (
  props
) => {
  const [value, setState] = useState(props.value);
  const minus = () => setState(value - 1);
  const plus = () => setState(value + 1);
  const context = { value, minus, plus };

  return (
    <CounterContext.Provider value={context}>
      {props.children}
    </CounterContext.Provider>
  );
};

const MinusButton: FC = () => {
  const context = useContext(CounterContext);

  return <button onClick={context?.minus}>-</button>;
};

const PlusButton: FC = () => {
  const context = useContext(CounterContext);

  return <button onClick={context?.plus}>+</button>;
};
const Viewer: FC = () => {
  const context = useContext(CounterContext);

  return <span>{context?.value}</span>;
};

const Counter = (props: ICounterProps) => {
  const [value, setState] = useState(props.value);

  const minus = () => setState(value - 1);
  const plus = () => setState(value + 1);

  return (
    <CounterContextProvider value={0}>
      <MinusButton />
      <Viewer />
      <PlusButton />
    </CounterContextProvider>
  );
};
const Home = () => {
  return <Counter value={0} />;
};

export default Home;
