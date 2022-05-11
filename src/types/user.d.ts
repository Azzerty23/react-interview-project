type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  address: Partial<UserAddress>;
  phone: string;
  department: string;
  email: string;
  role: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  website: string;
};
