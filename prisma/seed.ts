import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const Categories = ["食費", "水道光熱費", "家賃", "娯楽", "衣服・美容", "日用品", "病院代", "交通費", "その他"]

async function main() {
  console.log("Start Seeding...")

  // カテゴリーの作成
  Categories.forEach(async (value, index) => {
    const newCategory = await prisma.category.upsert({
      where: { id: index+1 },
      update: {},
      create: {
          id: index+1,
          name: value
      },
  });
  console.log(`Created category named ${newCategory.name}`);
  
  });

  for (let i = 0; i < 3; i++){

    // ユーザーの作成
    const newUser = await prisma.user.create({
      data:{
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordDigest: faker.internet.password()
      },
    });

    for (let i = 0; i < 20; i++){
      // 出費の作成
      const newExpense = await prisma.expense.create({
        data: {
          storeName: faker.company.name(),
          amount: parseInt(faker.finance.amount({ min: 0, max: 30000, dec: 0 })),
          date: faker.date.between({ from: '2024-08-01T00:00:00.000Z', to: '2024-09-31T00:00:00.000Z' }),
          userId: newUser.id,
          categoryId: Math.floor(Math.random() * 9) + 1
        },
      });
    }}

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })