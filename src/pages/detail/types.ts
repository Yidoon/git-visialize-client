export type ActiveKey = 'commit' | 'contributor' | 'activity' | 'other'

export interface IGeneralData {
  name: string
  age: string
  created_at: string
  star: number
  license: string
  code_count: {
    total: number
    add: number
    subs: number
  }
  file_count: number
  contributor_count: number
  volume: string
  commit_count: number
  _collected_time: string
}
