export class User {
  userId: string;
  userName: string;
  roles: UserRole[];
  employee: UserEmployee;

  constructor(user: User) {
    Object.assign(this, user);
  }

  get displayName() {
    if (!this.employee) {
      return this.userName;
    }
    return [this.employee.firstName, this.employee.lastName]
      .filter(Boolean)
      .join(' ');
  }

  get initials() {
    if (!this.employee) {
      return;
    }

    const lettersArray = [];

    if (this.employee.firstName && this.employee.lastName) {
      lettersArray.push(this.employee.firstName[0], this.employee.lastName[0]);
    }

    if (this.userName && !lettersArray.length) {
      lettersArray.push(this.userName[0]);
    }

    return lettersArray.join('');
  }

  get positionName() {
    if (!this.employee) {
      return;
    }

    return this.employee.positions[0] ? this.employee.positions[0].name : '';
  }
}

class UserEmployee {
  employeeId: string;
  firstName: string;
  lastName: string;
  positions: UserPosition[];
}

class UserPosition {
  positionId: string;
  name: string;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}
