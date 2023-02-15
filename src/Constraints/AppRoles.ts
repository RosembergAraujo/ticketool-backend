export enum AppRoles {
  //Must start by 1, because db starts by 1
  ADMIN = 1,
  MANAGER = 2,
  USER = 3,
}

export const HIGH_PRIVILEGES_APP_ROLES = [AppRoles.ADMIN];
export const LOW_PRIVILEGES_APP_ROLES = [AppRoles.MANAGER, AppRoles.USER];
export const ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION = [AppRoles.USER];
