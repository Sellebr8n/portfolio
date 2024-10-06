'use server';

import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: NextRequest) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${req.nextUrl.origin}/resume`);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Ludvig_Sellebråten_CV.pdf"',
    },
  });
}
