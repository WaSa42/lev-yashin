const endpoints = {
    // Auth
    register: () => '/user/register',
    signIn: () => '/user/sign-in',
    // Profile
    fetchProfile: () => '/user/profile',
    updateProfile: () => '/user/profile',
    resetPassword: () => '/user/reset-password',
    // Game
    createGame: () => '/games',
    fetchGame: id => `/games/${id}`,
    joinGame: id => `/games/${id}/join`,
};

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const getEndpoint = (key, params) => {
    if (endpoints[key]) { return process.env.API_PATH + endpoints[key](params); }

    // eslint-disable-next-line no-console
    console.error(`"${key}" is not a valid endpoint.`);
    return null;
};

export const getHeaders = (credentials) => {
    if (credentials && credentials.token) { headers.Authorization = `Bearer ${credentials.token}`; }

    return headers;
};
