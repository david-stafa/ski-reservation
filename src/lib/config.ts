export const config = {
  email: {
    from: 'Ski Reservation <onboarding@resend.dev>',
    subject: 'Potvrzení rezervace',
    // In development, always send to your email for testing
    getToEmail: (userEmail: string) => 
      process.env.NODE_ENV === 'production' ? userEmail : 'david.stafa@gmail.com'
  }
};