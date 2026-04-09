import { useEffect ,useState}  from 'react';
import * as Style from './Style';
import useCountdown from '../../hooks/useCountdown';

const Count = ({testC}) => {
   const { count, active } = useCountdown(3, () => testC());

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!active) return;

    setAnimate(true);

    const t = setTimeout(() => {
      setAnimate(false);
    }, 300);

    return () => clearTimeout(t);
  }, [count, active]);

  return (
   <Style.Countdown className={`${animate ? "animate" : ""}`}>
      {count > 0 ? count : "Go!"}
   </Style.Countdown>
  );
};

export default Count;
