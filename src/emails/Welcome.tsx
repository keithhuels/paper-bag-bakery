import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const Welcome = () => (
  <Html>
    <Head />
    <Preview>A blog for developers. By developers.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://i.postimg.cc/ydQZH27r/logo.png"}
          alt="Conscious Cog"
          style={logo}
        />
        <Text style={paragraph}>Hi</Text>
        <Text style={paragraph}>
          Welcome to Conscious Cog, a blog for software developers. Please
          confirm your registration by clicking{" "}
          <Link href="http://localhost:3000/confirm-login">here</Link>.
        </Text>
        <Section style={btnContainer}></Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Conscious Cog team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Conscious Cog</Text>
      </Container>
    </Body>
  </Html>
);

export default Welcome;

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
