import { PrismaClient } from "@prisma/client";

const prisma =global.prisma || new PrismaClient(); // vereficar se ele ja foi estaciado

if(process.env.NODE_ENV === "development") global.prisma = prisma ; // se estiver em dev setando global para nao precisar criar a conexao sempre



export default prisma;