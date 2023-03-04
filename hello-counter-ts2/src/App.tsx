import {
  useState,
  MouseEventHandler,
  FC,
  ReactNode,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";

type ICounterContext = {
  value: number;
  minus: () => void;
  plus: () => void;
};

const CounterContext = createContext<ICounterContext | null>(null);

type ICounterContextProviderProps = {
  value: number;
};

const CounterContextProvider: FC<
  PropsWithChildren<ICounterContextProviderProps>
> = (props) => {
  const [value, setState] = useState(props.value);
  const minus = () => setState(value - 1);
  const plus = () => setState(value + 1);
  const context: ICounterContext = { value, minus, plus };

  return (
    <CounterContext.Provider value={context}>
      {props.children}
    </CounterContext.Provider>
  );
};

const useCounterContext = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new TypeError("컨텍스트가 없어요");
  }

  return context;
};

const MinusButton: FC = () => {
  const context = useCounterContext();

  return <button onClick={context.minus}>-</button>;
};

const PlusButton: FC = () => {
  const context = useCounterContext();

  return <button onClick={context.plus}>+</button>;
};

const Viewer: FC = () => {
  const context = useCounterContext();

  return <span>{context.value}</span>;
};

const Counter = () => {
  return (
    <CounterContextProvider value={0}>
      <MinusButton />
      <Viewer />
      <PlusButton />
    </CounterContextProvider>
  );
};

const Home = () => {
  return <Counter />;
};

export default Home;
