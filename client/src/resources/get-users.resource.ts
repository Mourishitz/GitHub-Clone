import UserResource from "./user.resource"

export type GetUsersResponse = {
  data: UserResource[]
  next: string
  previous: string
}