export enum ColumnVisibility {
  ACTIONS = "actions",
  START_DATE = "startDate",
  LAST_NAME = "lastName",
  FIRST_NAME = "firstName",
  PEOPLE_COUNT = "peopleCount",
  EMAIL = "email",
  PHONE = "phone",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  ID = "id",
}

export const ColumnLabels: Record<ColumnVisibility, string> = {
  [ColumnVisibility.ACTIONS]: "Akce",
  [ColumnVisibility.START_DATE]: "Termín rezervace",
  [ColumnVisibility.LAST_NAME]: "Příjmení",
  [ColumnVisibility.FIRST_NAME]: "Jméno",
  [ColumnVisibility.PEOPLE_COUNT]: "Počet osob",
  [ColumnVisibility.EMAIL]: "Email",
  [ColumnVisibility.PHONE]: "Telefon",
  [ColumnVisibility.CREATED_AT]: "Vytvořeno",
  [ColumnVisibility.UPDATED_AT]: "Aktualizováno",
  [ColumnVisibility.ID]: "ID",
};

export const getColumnLabel = (columnId: string): string => {
  return ColumnLabels[columnId as ColumnVisibility] || columnId;
};
