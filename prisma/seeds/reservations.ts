import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function to create a date with specific time
function createDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}`)
}

// All available time slots between 15:00 and 19:00
const AVAILABLE_TIMESLOTS = [
  '15:00:00', '15:10:00', '15:20:00', '15:30:00', '15:40:00', '15:50:00',
  '16:00:00', '16:10:00', '16:20:00', '16:30:00', '16:40:00', '16:50:00',
  '17:00:00', '17:10:00', '17:20:00', '17:30:00', '17:40:00', '17:50:00',
  '18:00:00', '18:10:00', '18:20:00', '18:30:00', '18:40:00', '18:50:00'
]

// End times (start time + 10 minutes)
const END_TIMESLOTS = [
  '15:10:00', '15:20:00', '15:30:00', '15:40:00', '15:50:00', '16:00:00',
  '16:10:00', '16:20:00', '16:30:00', '16:40:00', '16:50:00', '17:00:00',
  '17:10:00', '17:20:00', '17:30:00', '17:40:00', '17:50:00', '18:00:00',
  '18:10:00', '18:20:00', '18:30:00', '18:40:00', '18:50:00', '19:00:00'
]

// Sample Czech names for variety
const FIRST_NAMES = [
  'Jan', 'Marie', 'Petr', 'Anna', 'Tomáš', 'Lucie', 'Martin', 'Eva', 'Josef', 'Jana',
  'Pavel', 'Hana', 'Michal', 'Kateřina', 'David', 'Lenka', 'Jiří', 'Alena', 'Lukáš', 'Věra',
  'Milan', 'Ivana', 'Roman', 'Monika', 'Václav', 'Jitka', 'Ondřej', 'Dagmar', 'Jakub', 'Zuzana',
  'Filip', 'Martina', 'Adam', 'Helena', 'Daniel', 'Simona', 'Matěj', 'Renata', 'Karel', 'Blanka',
  'Marek', 'Jaroslava', 'Vojtěch', 'Marcela', 'Dominik', 'Libuše', 'Patrik', 'Jarmila', 'Radek', 'Božena'
]

const LAST_NAMES = [
  'Novák', 'Svobodová', 'Černý', 'Veselá', 'Malý', 'Králová', 'Dvořák', 'Hrušková', 'Procházka', 'Kučerová',
  'Horák', 'Němcová', 'Krejčí', 'Čermáková', 'Růžička', 'Marková', 'Beneš', 'Soukupová', 'Polák', 'Doležalová',
  'Hájek', 'Čechová', 'Král', 'Holubová', 'Urban', 'Růžičková', 'Kříž', 'Vávrová', 'Kovařík', 'Blažková',
  'Vaněk', 'Šimková', 'Sedláček', 'Tichá', 'Vlček', 'Machová', 'Štěpánek', 'Kopecká', 'Kadlec', 'Ševčíková',
  'Černík', 'Havlíčková', 'Kohout', 'Horáková', 'Kratochvíl', 'Nováková', 'Hruška', 'Svobodová', 'Rezek', 'Černá'
]

// Generate email from name
function generateEmail(firstName: string, lastName: string, index: number): string {
  const cleanFirstName = firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const cleanLastName = lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return `${cleanFirstName}.${cleanLastName}${index}@testemail.cz`
}

// Generate phone number
function generatePhone(): string {
  const format = Math.random() > 0.5
  if (format) {
    // XXX XXX XXX format
    return `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`
  } else {
    // XXXXXXXXX format
    return `${Math.floor(Math.random() * 900000000) + 100000000}`
  }
}

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing reservations
  await prisma.reservation.deleteMany()
  console.log('🗑️  Cleared existing reservations')

  // Only Monday and Tuesday
  const dates = ['2025-09-15', '2025-09-16'] // Monday and Tuesday

  let totalReservations = 0

  for (const date of dates) {
    console.log(`📅 Creating reservations for ${date}...`)
    
    // Use all available time slots (no shuffling, fill them all)
    for (let i = 0; i < AVAILABLE_TIMESLOTS.length; i++) {
      const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
      const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
      const timeSlot = AVAILABLE_TIMESLOTS[i]
      
      const reservationData = {
        firstName,
        lastName,
        email: generateEmail(firstName, lastName, i),
        phone: generatePhone(),
        peopleCount: 1, // Only single person reservations
        startDate: createDateTime(date, timeSlot),
        endDate: createDateTime(date, END_TIMESLOTS[i]),
      }

      const reservation = await prisma.reservation.create({
        data: reservationData,
      })
      
      console.log(`✅ Created reservation for ${reservation.firstName} ${reservation.lastName} at ${timeSlot}`)
      totalReservations++
    }
  }

  for (let i = 0; i < AVAILABLE_TIMESLOTS.length - 2; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const timeSlot = AVAILABLE_TIMESLOTS[i]
    
    const reservationData = {
      firstName,
      lastName,
      email: generateEmail(firstName, lastName, i),
      phone: generatePhone(),
      peopleCount: 1, // Only single person reservations
      startDate: createDateTime("2025-09-17", timeSlot),
      endDate: createDateTime("2025-09-17", END_TIMESLOTS[i]),
    }

    const reservation = await prisma.reservation.create({
      data: reservationData,
    })
    
    console.log(`✅ Created reservation for ${reservation.firstName} ${reservation.lastName} at ${timeSlot}`)
    totalReservations++
  }

  console.log(`🎉 Successfully seeded ${totalReservations} reservations across ${dates.length} days!`)
  console.log(`📊 Each day has ${AVAILABLE_TIMESLOTS.length} time slots filled`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })