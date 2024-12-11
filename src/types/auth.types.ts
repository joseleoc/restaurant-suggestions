export class User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  birthday?: Date;
  is_active?: boolean;
  is_deleted?: boolean;
  profile_completed?: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone_number?: string;
  allergies?: string[];

  constructor(data: User) {
    Object.assign(this, data);
    this.id = data.id;
    this.email = data.email;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
    this.is_deleted = data.is_deleted || false;
    this.is_active = data.is_active || true;
    this.profile_completed = data.profile_completed || false;
    this.phone_number = data.phone_number || "";
    this.allergies = data.allergies || [];
  }
}
