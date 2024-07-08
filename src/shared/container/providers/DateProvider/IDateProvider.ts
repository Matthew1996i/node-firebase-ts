interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;

  convertToUTC(date: Date): string;
  format(date: Date): string;
  dateNow(): Date;

  addMonth(months: number, reference_date: Date): Date;
  addDays(days: number, reference_date: Date): Date;
  addHours(hours: number, reference_date: Date): Date;

  checkIsBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
