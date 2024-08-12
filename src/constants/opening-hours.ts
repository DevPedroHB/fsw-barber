interface IOpeningHours {
  dayOfWeek: number;
  schedules: {
    from: Date;
    to: Date;
    gap: number;
  };
}

export const openingHours: IOpeningHours[] = [
  {
    dayOfWeek: 2,
    schedules: {
      from: new Date("2024-08-13T07:00:00"),
      to: new Date("2024-08-13T17:00:00"),
      gap: 30,
    },
  },
  {
    dayOfWeek: 3,
    schedules: {
      from: new Date("2024-08-14T07:00:00"),
      to: new Date("2024-08-14T17:00:00"),
      gap: 30,
    },
  },
  {
    dayOfWeek: 4,
    schedules: {
      from: new Date("2024-08-15T07:00:00"),
      to: new Date("2024-08-15T17:00:00"),
      gap: 30,
    },
  },
  {
    dayOfWeek: 5,
    schedules: {
      from: new Date("2024-08-16T07:00:00"),
      to: new Date("2024-08-16T17:00:00"),
      gap: 30,
    },
  },
  {
    dayOfWeek: 6,
    schedules: {
      from: new Date("2024-08-17T07:00:00"),
      to: new Date("2024-08-17T17:00:00"),
      gap: 30,
    },
  },
];
