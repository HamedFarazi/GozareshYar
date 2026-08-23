export interface FormData {
  // اطلاعات گزارش
  reportDate: string;
  branchName: string;
  
  // آمار فروش
  totalSales: string;
  totalDiscount: string;
  invoiceCount: string;
  averageInvoice: string;
  
  // شیفت‌ها
  morningManagerGender: 'آقای' | 'خانم';
  morningManagerName: string;
  eveningManagerGender: 'آقای' | 'خانم';
  eveningManagerName: string;
  morningAttendance: string;
  eveningAttendance: string;
  shutterUpTime: string;
  shutterDownTime: string;
  
  // نکات امروز
  todayNotes: string;
  
  // نظافت
  cleaningStartTime: string;
  cleaningEndTime: string;
  cleaningPersonGender: 'آقای' | 'خانم';
  cleaningPersonName: string;
}
