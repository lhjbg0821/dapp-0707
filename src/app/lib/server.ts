// lib는 가져올때 주의해야할부분!! 서버측에서만 실행할거라서 한곳에 몰아놓으면 안됨
// 서버측 / 클라이언트측 lib는 분리를 해놓는 게 좋음 그렇게 안하면 실행 안될수동동
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
