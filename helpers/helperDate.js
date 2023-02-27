Date.prototype.toMonthString=function () {
    switch (this.getMonth()) {
      case 0:
        return "січеня";
        break;
      case 1:
        return "лютого";
        break;
      case 2:
        return "березня";
        break;
      case 3:
        return "квітня";
        break;
      case 4:
        return "травня";
        break;
      case 5:
        return "червнь";
        break;
      case 6:
        return "липня";
        break;
      case 7:
        return "серпня";
        break;
      case 8:
        return "вересня";
        break;
      case 9:
        return "жовтня";
        break;
      case 10:
        return "листопада";
        break;
      case 11:
        return "грудня";
        break;
    }
  };

 export const helperDate = (date) => {
    const newDate = new Date(date);
    const namber = newDate.getDate();
    const month = newDate.toMonthString();
    const year = newDate.getFullYear();
   
  
    return `${namber} ${month} ${year}`;
  };

  export const helperTime = (date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

   
    return `${hours}:${minutes}`;
  };