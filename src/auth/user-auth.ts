import { Sleep } from "./sleep/sleep";

type UserLogin = {
  email: string;
  password: string;
};

const USER: Record<string, string> = {
  "myname@gmail.com": "MyPass123!",
};

export async function UserAuth({ email, password }: UserLogin): Promise<void> {
  await Sleep(1000);

  const exprectedPass = USER[email.toLowerCase()];
  if (!exprectedPass || exprectedPass !== password) {
    throw new Error("Either eamil or password is invalid");
  }
}
