const BASE_URL = '/api/v1';

export async function request({ url, options }) {
  const response = await fetch(url, options);

  return response.json();
}

export async function authRequest({ url, method, data, accessToken }) {
  const opptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!accessToken && { Authorization: `bearer ${accessToken}` }),
    },
    body: JSON.stringify({
      data,
    }),
  };

  return request(url, opptions);
}

export async function getFakePassenger(page, size) {
  const url = `${BASE_URL}/passenger?page=${page}&size=${size}`;
  return request({ url });
}

export async function postMembers({ data, accessToken }) {
  const url = `${BASE_URL}//members`;
  return authRequest({ url, data, accessToken });
}

export async function getMember({ memberId }) {
  const url = `${BASE_URL}/${memberId}`;
  return request(url);
}

export async function getBulletins({ page, size }) {
  const url = `${BASE_URL}/bulletin-posts?page=${page}&size=${size}`;
  return request({ url });
}

export async function getSearchs({ page, size, type, name }) {
  const url = `${BASE_URL}/search?type=${type}&name=${name}&page=${page}&size=${size}`;
  return request({ url });
}
