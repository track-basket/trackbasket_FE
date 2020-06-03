const TimeOfDay = () => {
  let today = new Date();
  let hour = today.getHours();
  let greeting;
  if (hour < 12) {
    greeting = 'Good morning';
  }
  if (hour >= 18) {
    greeting = 'Good evening';
  }
  if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  }
  return greeting;
};

export default TimeOfDay;
