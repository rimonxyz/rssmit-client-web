export class DateUtil {
  public static monthNames: string[] = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  public static monthNamesShort: string[] = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  public static formatReadableDateTime(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var armyhours = date.getHours();
    var hours = (armyhours >= 12) ? armyhours - 12 : armyhours;
    var minutes = date.getMinutes();
    var ampm = (armyhours >= 12) ? "PM" : "AM";
    return this.monthNamesShort[monthIndex] + ' ' + day + ', ' + year + ' at ' + hours + ':' + minutes + ' ' + ampm;
  }

  public static formatReadableDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return this.monthNamesShort[monthIndex] + ' ' + day + ', ' + year;
  }

  public static isInValidDateForSharing(month: string, year: number) {
    if (month == null || year == null) return true;

    let mNumber: number;
    DateUtil.monthNames.forEach((m, i) => {
      if (m.toLowerCase() === month.toLowerCase())
        mNumber = i + 1;
    });
    let date: Date = new Date();
    date.setFullYear(year, mNumber - 1, 15);
    console.log(mNumber + " " + month + " " + year);
    console.log(date);
    return date >= new Date();
  }

}
