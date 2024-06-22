import { env } from "@/lib/envValidator";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from "@react-email/components";
interface VercelInviteUserEmailProps {
  username?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  inviteLink?: string;
}

const { BASE_URL } = env
const baseUrl = BASE_URL

export const ForgetPasswordTemplate = ({
  username,
  invitedByUsername,
  invitedByEmail,
  inviteLink,
}: VercelInviteUserEmailProps) => {
  const linkToUse = `${baseUrl}/${inviteLink}`
  const previewText = `Reset Password ${invitedByUsername}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset Password
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has sent you to the <strong>link</strong> to reset your password.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={linkToUse}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={linkToUse} className="text-blue-600 no-underline">
                {linkToUse}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{ }</span>{" "}
              located in{" "}
              <span className="text-black">{invitedByUsername}</span>. If you
              were not expecting this invitation, you can ignore this email.            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default ForgetPasswordTemplate;
