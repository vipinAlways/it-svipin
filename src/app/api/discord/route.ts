"use server";
import { getStatus } from "@/bot";
import { NextResponse } from "next/server";


export default async function GET() {
  return NextResponse.json({ status: getStatus() }, { status: 200 });
}