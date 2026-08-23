import type { FormData } from '../types';
import * as jalaali from 'jalaali-js';

export function generateReport(data: FormData): string {
  const report = `گزارش شعبه ${data.branchName} مورخ : ${data.reportDate}
آمار فروش
مجموع فروش (ریال):${data.totalSales}
مجموع تخفیف (ریال): ${data.totalDiscount}
تعداد فاکتور:${data.invoiceCount}
میانگین مبلغ هر فاکتور:${data.averageInvoice}
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
