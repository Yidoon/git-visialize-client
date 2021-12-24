import { request } from 'umi';

export async function getRepoInfo() {
  return request('/api/repo_info', {
    method: 'GET',
  });
}
export async function getWeekCommit() {
  return request('/api/week_commit', {
    method: 'GET',
  });
}
