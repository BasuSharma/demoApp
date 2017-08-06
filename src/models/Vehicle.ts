// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface Vehicle {
vehicle_id: string,
lat: string,
long:string,
name:string,
model:string,
power_level_percent: string,
distanceFromCommandCenter:number;
}