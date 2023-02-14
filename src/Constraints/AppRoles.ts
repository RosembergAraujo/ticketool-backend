export enum AppRoles {
  //Must start by 1, because db starts by 1
  ADMIN = 1,
  DEV = 2,
  MANAGER = 3,
  USER = 4,
}

export const HIGH_PRIVILEGES_APP_ROLES = [AppRoles.ADMIN, AppRoles.DEV];
export const LOW_PRIVILEGES_APP_ROLES = [AppRoles.MANAGER, AppRoles.USER];
