import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ReservationConfirmationEmailProps {
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;
  peopleCount: number;
}

const ReservationConfirmationEmail = ({
  firstName,
  lastName,
  startDate,
  endDate,
  peopleCount,
}: ReservationConfirmationEmailProps) => {
  const formattedStartDate = new Date(startDate).toLocaleString('cs-CZ');
  const formattedEndDate = new Date(endDate).toLocaleString('cs-CZ');

  return (
    <Html>
      <Head />
      <Preview>Potvrzení vaší rezervace</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Potvrzení rezervace</Heading>
          <Section style={section}>
            <Text style={text}>
              Vážený/á {firstName} {lastName},
            </Text>
            <Text style={text}>
              děkujeme za vaši rezervaci. Zde jsou detaily vaší rezervace:
            </Text>
            <Text style={text}>
              Datum a čas začátku: {formattedStartDate}
            </Text>
            <Text style={text}>
              Datum a čas konce: {formattedEndDate}
            </Text>
            <Text style={text}>
              Počet osob: {peopleCount}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const section = {
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '4px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  margin: '24px 0',
};

export default ReservationConfirmationEmail;