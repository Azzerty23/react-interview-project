type Counter = string | number;

type CountData = {
  totalUsers: Counter;
  totalPosts: Counter;
  avgPosts: Counter;
  activeUsers: Counter;
  maxActivity: Counter;
  mostActiveUser?: User;
  recentPosts: Counter;
  usersInApt: Counter;
  usersInSuite: Counter;
};
