import { signIn } from "next-auth/react";
import { AuthButton, Container } from "./styles";
import { useRouter } from "next/router";

type AuthButtonsProps = {
  callbackUrl?: string;
};

export function AuthButtons({ callbackUrl = "/" }: AuthButtonsProps) {
  const router = useRouter();

  const handleSingnIn = (provider?: string) => {
    if (!provider) {
      router.push(callbackUrl);
      return;
    }
    signIn(provider, {
      callbackUrl,
    });
  };

  return (
    <Container>
      <AuthButton onClick={() => handleSingnIn("google")}>
        <img src="/images/icons/google.svg" alt="Google Logo" />
        Entrar com Google
      </AuthButton>
      <AuthButton onClick={() => handleSingnIn("github")}>
        <img src="/images/icons/github.svg" alt="Github Logo" />
        Entrar com Github
      </AuthButton>
      <AuthButton onClick={() => handleSingnIn()}>
        <img src="/images/icons/rocket.svg" alt="Rocket Logo" />
        Entrar como visitante
      </AuthButton>
    </Container>
  );
}
