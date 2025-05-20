import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERIFY_EMAIL_URL
  ? `${process.env.VERIFY_EMAIL_URL}`
  : "";

interface VerificationTemplateProps {
  email: string;
  emailVerificationToken: string;
}

export const EmailVerificationTemplate = ({
  emailVerificationToken,
}: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>A blog for developers. By developers.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://i.postimg.cc/ydQZH27r/logo.png"}
          alt="The Paper Bag Bakery"
          style={logo}
        />
        <Text style={paragraph}>
          Thank you for signing up with The Paper Bag Bakery. Please confirm your
          registration by clicking the button below.
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/verify-email?token=${emailVerificationToken}`}
          >
            Confirm Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The The Paper Bag Bakery team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>The Paper Bag Bakery 2025</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailVerificationTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
