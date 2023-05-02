import { AuthButtons } from "@/components/AuthButtons";
import { Heading, Text } from "@/components/Typography";
import {
  LogoContainer,
  LogoSection,
  WelcomeSection,
} from "@/styles/pages/login";
import React from "react";

const Login = () => {
  return (
    <LogoContainer>
      <LogoSection>
        <img src="/images/logo.svg" alt="BookWise Logo" />
      </LogoSection>
      <WelcomeSection>
        <Heading size="lg" color="gray-100">
          Boas vindas!
        </Heading>
        <Text color='gray-200'>
            Faça seu login ou acesse como visitante.
        </Text>
        <AuthButtons/>
      </WelcomeSection>
    </LogoContainer>
  );
};

export default Login;
