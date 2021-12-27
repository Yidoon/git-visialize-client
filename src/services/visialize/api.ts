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

// contributors_data
export async function getContributorsCommitData() {
  return request('/api/contributors_data', {
    method: 'GET',
  });
}

export async function getContributorCommitDataByMonth(contributor?: string) {
  return request('/api/commit_by_month', {
    method: 'GET',
    params: { contributor },
  });
}
export async function getContributors() {
  return request('/api/contributors');
}

export async function getWorldCloud(contributor?: string) {
  return request('/api/word_could', {
    method: 'GET',
    params: { contributor },
  });
}

export async function getFileCommitTop10() {
  return request('/api/file_commit_top10', {
    method: 'GET',
  });
}

export async function getFileLineCodeTop10() {
  return request('/api/file_line_code_top10', {
    method: 'GET',
  });
}
