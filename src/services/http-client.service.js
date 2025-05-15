export const redditPostBySubreddit = async (subreddit) => {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const resData = await res.json();

  if (resData.error) throw new Error(resData.error);

  if (!resData?.data?.children) return [];

  const items = resData.data.children
    .map((r) => {
      const { title, ups, permalink: pathLink } = r.data;

      const permalink = `https://www.reddit.com${pathLink}`;

      return { title, ups, permalink };
    })
    .sort((a, b) => b.ups - a.ups);

  return items;
};
