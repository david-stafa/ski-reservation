const DateInput = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  
  // PO = 1, UT = 2, .... NE = 0
  const dayInWeek = new Date().getDay();

  function renderNewWeek() {
    for (let index = 0; index < daysInWeek; index++) {}
  }

  console.log(dayInWeek);

  return <h1>Hello</h1>;
};

export default DateInput;
