
import { Section, Container } from "../Components/Layout";
import { Heading, Text } from "../Components/Typography";

export default function Home() {
  return (
    <>
      <Section bg="bg-white">
        <Container>
          <Heading level={1}>Cloud Architecture Lab</Heading>
          <Text>Start building scalable infrastructure today.</Text>
        </Container>
      </Section>


    </>
  );
}
