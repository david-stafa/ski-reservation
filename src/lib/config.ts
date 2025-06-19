export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  email: {
    from: 'Ski Reservation <onboarding@resend.dev>',
    subject: 'Potvrzení rezervace',
    // In development, always send to your email for testing
    getToEmail: (userEmail: string) => 
      process.env.NODE_ENV === 'production' ? userEmail : 'david.stafa@gmail.com'
  }
}; 