export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    USER = 'USER',
}

// export type Role = (typeof Role)[keyof typeof Role

export const HIGH_PRIVILEGES_APP_ROLES = [Role.ADMIN];
export const LOW_PRIVILEGES_APP_ROLES = [Role.MANAGER, Role.USER];
export const ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION = [Role.USER];
