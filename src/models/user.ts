// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface User {
  login: string;
  vehicleId: string;
  action_name: string;
  action_details: string;
  user_id: string;
  zone: string;
  lastusedAt: string;
  user_type: string;
}