const 함수 = (숫자일껄?: number) => {
  if (!숫자일껄) {
    throw new TypeError("숫자 넣으랬지");
  }
  return 숫자일껄 + 1;
};
