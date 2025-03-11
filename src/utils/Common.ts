

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
    .slice(0, 2);
};

export { getInitials };