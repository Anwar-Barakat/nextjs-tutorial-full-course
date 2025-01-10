type User = {
  name: string;
  age: number;
  email: string;
};

type Admin = User & {
  role: "admin";
};

export { type User, type Admin };
