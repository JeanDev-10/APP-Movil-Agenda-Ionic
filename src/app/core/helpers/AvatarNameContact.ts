
export const splitName=(fullName: string): { firstName: string; lastName: string } =>{
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts[1] : '';

  return { firstName, lastName };
}
