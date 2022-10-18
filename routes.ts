const routes = {
  home: '/',
  entries: {
    owners: '/entries/owners',
    users: '/entries/users',
    view: (transactionHash: string): string =>
      `/entries/view/${transactionHash}`,
  },
  profile: (address: string): string => `/profile/${address}`,
  api: {
    bunzzGnft: {
      post: '/api/bunzz/gnft',
      get: (transactionHash: string): string => `/api/bunzz/${transactionHash}`,
      search: (address = ''): string => `/api/bunzz/search/${address}`,
    },
  },
};

export default routes;
