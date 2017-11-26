export class DateUtil {
  static monthNames: string[] = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  static monthNamesShort: string[] = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  public static formatReadableDate(date) {

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var armyhours = date.getHours();
    var hours = (armyhours >= 12) ? armyhours - 12 : armyhours;
    var minutes = date.getMinutes();
    var ampm = (armyhours >= 12) ? "PM" : "AM";
    return this.monthNamesShort[monthIndex] + ' ' + day + ', ' + year + ' at ' + hours + ':' + minutes + ' ' + ampm;
  }

}
