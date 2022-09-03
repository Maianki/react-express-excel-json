export default function getRace(users) {
  if (users) {
    return users.reduce((acc, curr) => {
      return acc.includes(curr.race) ? acc : [...acc, curr.race];
    }, []);
  }
  return [];
}
