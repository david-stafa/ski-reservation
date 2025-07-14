import bcrypt from 'bcrypt';

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// You can change this password to whatever you want
const password = '123456789';
hashPassword(password); 