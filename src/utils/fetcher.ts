export const fetcher = (url: string, token: string) =>
  token
    ? fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    : fetch(url).then((res) => res.json())
