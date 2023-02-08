export enum UserRolesEnum {
    Student = 'student',
    Teacher = 'teacher',
}

export interface ICreateUserDTO {
    name: string,
    email: string,
    password: string,
    type: UserRolesEnum,
}
