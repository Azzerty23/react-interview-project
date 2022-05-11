export enum ResidenceTypeFilter {
  all = '',
  apartment = 'Apt',
  suite = 'Suite',
}

const isUserInResidenceType = (user: User, type = ResidenceTypeFilter.all) =>
  user.address.suite?.startsWith(type);

export default isUserInResidenceType;
