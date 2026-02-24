import { prisma } from "@/lib/db/prisma";

export async function writeAnalyticsEvent(page: string, device: string) {
  await prisma.analyticsEvent.create({
    data: {
      page,
      device,
      dayBucket: new Date().toISOString().slice(0, 10)
    }
  });
}
