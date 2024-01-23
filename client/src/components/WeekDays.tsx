import useWindowSize from "../hooks/useWindowSize";
import * as S from "../components/styles/WeekDays.styles";

const WeekDays = () => {
  const { isSmall } = useWindowSize();
  const small = ["S", "M", "T", "W", "T", "F", "S"];
  const medium = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      {isSmall ? (
        <S.Container>
          {small.map((day, index) => (
            <S.Day key={index}>{day}</S.Day>
          ))}
        </S.Container>
      ) : (
        <S.Container>
          {medium.map((day, index) => (
            <S.Day key={index}>{day}</S.Day>
          ))}
        </S.Container>
      )}
    </>
  );
};

export default WeekDays;
