import type { FormData } from '../types';
import * as jalaali from 'jalaali-js';

export function formatNumberWithSlashSeparators(value: string): string {
  // If value is empty or null, return empty string
  if (!value && value !== '0') {
    return '';
  }

  // Remove any existing "/" separators
  let cleanValue = value.replace(/\//g, '');
  
  // Remove any non-digit characters except for the minus sign at the beginning
  // This keeps only Latin digits and optional minus sign
  cleanValue = cleanValue.replace(/[^\d-]/g, '');
  
  // Handle negative numbers
  const isNegative = cleanValue.startsWith('-');
  const digits = isNegative ? cleanValue.substring(1) : cleanValue;
  
  // If after cleaning we have nothing (or just a minus sign), return original value
  if (!digits && digits !== '0') {
    return value;
  }
  
  // Format with "/" separator every 3 digits from right
  const formatted = digits
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    ?.join('/')
    .split('')
    .reverse()
    .join('') || digits;
  
  return isNegative ? `-${formatted}` : formatted;
}

export function generateReport(data: FormData): string {
  // Format sales fields
  const formattedTotalSales = formatNumberWithSlashSeparators(data.totalSales);
  const formattedTotalDiscount = formatNumberWithSlashSeparators(data.totalDiscount);
  const formattedInvoiceCount = formatNumberWithSlashSeparators(data.invoiceCount);
  const formattedAverageInvoice = formatNumberWithSlashSeparators(data.averageInvoice);

  const report = `گزارش شعبه ${data.branchName} مورخ : ${data.reportDate}
آمار فروش
مجموع فروش (ریال):${formattedTotalSales}
مجموع تخفیف (ریال): ${formattedTotalDiscount}
تعداد فاکتور:${formattedInvoiceCount}
میانگین مبلغ هر فاکتور:${formattedAverageInvoice}
--------------------------------------------------------
مسئول شیفت صبح:${data.morningManagerGender} ${data.morningManagerName}
مسئول شیفت عصر:${data.eveningManagerGender} ${data.eveningManagerName}
تعداد حاضرین شیفت صبح:${data.morningAttendance}
تعداد حاضرین شیفت عصر:${data.eveningAttendance}
ساعت بالارفتن کرکره:${data.shutterUpTime}
ساعت پایین آمد کرکره:${data.shutterDownTime}
--------------------------------------------------------
عنوان نکات امروز:
${data.todayNotes}
--------------------------------------------------------
ساعت شروع نظافت:${data.cleaningStartTime}
ساعت پایان نظافت:${data.cleaningEndTime}
نظافت توسط ${data.cleaningPersonGender} ${data.cleaningPersonName} انجام شد.`;

  return report;
}

export function getTodayPersianDate(): string {
  const now = new Date();
  const jDate = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  // Convert to Persian digits
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const dateStr = `${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(jDate.jd).padStart(2, '0')}`;
  
  return dateStr.split('').map(char => {
    const num = parseInt(char);
    return isNaN(num) ? char : persianDigits[num];
  }).join('');
}
