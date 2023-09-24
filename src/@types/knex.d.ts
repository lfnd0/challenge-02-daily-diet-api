/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      session_id: string
      username: string
      created_at: string
      updated_at: string
    }
    snacks: {
      id: string
      name: string
      description: string
      date: string
      hour: string
      is_in_diet: boolean | number
      user_id: string
      created_at: string
      updated_at: string
    }
  }
}
