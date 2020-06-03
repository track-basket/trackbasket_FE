const TimeOfDay = () => {
  let today = new Date();
  let hour = today.getHours();
  let greeting;
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour > 18) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good afternoon';
  }
  return greeting;
};

export default TimeOfDay;
