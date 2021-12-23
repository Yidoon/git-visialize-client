import { request } from 'umi';

export async function getRepoInfo() {
  return request('/api/repo_info', {
    method: 'GET',
  });
}
