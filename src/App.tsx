import { useState, useEffect } from 'react';
import { Copy, Trash2, Check, FileText, Info } from 'lucide-react';
import type { FormData } from './types';
import { generateReport, getTodayPersianDate, formatNumberWithSlashSeparators } from './utils/generateReport';
import { saveFormData, loadFormData, clearFormData } from './utils/storage';
import { FormSection } from './components/FormSection';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { GenderSelector } from './components/GenderSelector';
import { Button } from './components/Button';

const initialFormData: FormData = {
  reportDate: getTodayPersianDate(),
  branchName: 'هایپراستار',
  totalSales: '',
  totalDiscount: '',
  invoiceCount: '',
  averageInvoice: '',
  morningManagerGender: 'آقای',
  morningManagerName: '',
  eveningManagerGender: 'آقای',
  eveningManagerName: '',
  morningAttendance: '',
  eveningAttendance: '',
  shutterUpTime: '',
  shutterDownTime: '',
  todayNotes: '',
  cleaningStartTime: '',
  cleaningEndTime: '',
  cleaningPersonGender: 'آقای',
  cleaningPersonName: '',
};

function App() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = loadFormData();
    return saved ? { ...initialFormData, ...saved } : initialFormData;
  });
  const [copied, setCopied] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    // Format sales fields as they are entered
    if (field === 'totalSales' || field === 'totalDiscount' || 
        field === 'invoiceCount' || field === 'averageInvoice') {
      // Format the value with slash separators
      const formattedValue = formatNumberWithSlashSeparators(value as string);
      setFormData(prev => ({ ...prev, [field]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const generatedReport = generateReport(formData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('خطا در کپی کردن. لطفا دوباره تلاش کنید.');
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    clearFormData();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                گزارش‌یار
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                ساخت سریع گزارش روزانه شعبه
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Column */}
          <div className="space-y-6">
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>اطلاعات فرم در مرورگر شما ذخیره می‌شود.</p>
            </div>

            {/* Section 1: Report Info */}
            <FormSection title="اطلاعات گزارش">
              <Input
                label="تاریخ گزارش"
                id="reportDate"
                value={formData.reportDate}
                onChange={(e) => updateField('reportDate', e.target.value)}
                placeholder="۱۴۰۵/۰۶/۰۱"
              />
              <Input
                label="نام شعبه"
                id="branchName"
                value={formData.branchName}
                onChange={(e) => updateField('branchName', e.target.value)}
                placeholder="هایپراستار"
              />
            </FormSection>

            {/* Section 2: Sales Stats */}
            <FormSection title="آمار فروش">
              <Input
                label="مجموع فروش (ریال)"
                id="totalSales"
                value={formData.totalSales}
                onChange={(e) => updateField('totalSales', e.target.value)}
                placeholder="662/490/000"
              />
              <Input
                label="مجموع تخفیف (ریال)"
                id="totalDiscount"
                value={formData.totalDiscount}
                onChange={(e) => updateField('totalDiscount', e.target.value)}
                placeholder="0"
              />
              <Input
                label="تعداد فاکتور"
                id="invoiceCount"
                value={formData.invoiceCount}
                onChange={(e) => updateField('invoiceCount', e.target.value)}
                placeholder="15"
              />
              <Input
                label="میانگین مبلغ هر فاکتور"
                id="averageInvoice"
                value={formData.averageInvoice}
                onChange={(e) => updateField('averageInvoice', e.target.value)}
                placeholder="44/166/000"
              />
            </FormSection>

            {/* Section 3: Shifts */}
            <FormSection title="شیفت‌ها">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GenderSelector
                  label="جنسیت مسئول صبح"
                  value={formData.morningManagerGender}
                  onChange={(value) => updateField('morningManagerGender', value)}
                />
                <Input
                  label="نام مسئول صبح"
                  id="morningManager"
                  value={formData.morningManagerName}
                  onChange={(e) => updateField('morningManagerName', e.target.value)}
                  placeholder="شهبازی"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GenderSelector
                  label="جنسیت مسئول عصر"
                  value={formData.eveningManagerGender}
                  onChange={(value) => updateField('eveningManagerGender', value)}
                />
                <Input
                  label="نام مسئول عصر"
                  id="eveningManager"
                  value={formData.eveningManagerName}
                  onChange={(e) => updateField('eveningManagerName', e.target.value)}
                  placeholder="پیشانی دار"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="تعداد حاضرین شیفت صبح"
                  id="morningAttendance"
                  value={formData.morningAttendance}
                  onChange={(e) => updateField('morningAttendance', e.target.value)}
                  placeholder="۲"
                />
                <Input
                  label="تعداد حاضرین شیفت عصر"
                  id="eveningAttendance"
                  value={formData.eveningAttendance}
                  onChange={(e) => updateField('eveningAttendance', e.target.value)}
                  placeholder="۲"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="ساعت بالارفتن کرکره"
                  id="shutterUp"
                  type="time"
                  value={formData.shutterUpTime}
                  onChange={(e) => updateField('shutterUpTime', e.target.value)}
                />
                <Input
                  label="ساعت پایین آمدن کرکره"
                  id="shutterDown"
                  type="time"
                  value={formData.shutterDownTime}
                  onChange={(e) => updateField('shutterDownTime', e.target.value)}
                />
              </div>
            </FormSection>

            {/* Section 4: Today's Notes */}
            <FormSection title="نکات امروز">
              <Textarea
                label="نکات و رویدادهای امروز"
                id="todayNotes"
                value={formData.todayNotes}
                onChange={(e) => updateField('todayNotes', e.target.value)}
                placeholder="حضور اقای چهرازی خانوم تهرانی.&#10;تحویل گرفتن ۱۲ عدد چراغ از لاله‌زار .&#10;حضور خانوم رییسی جهت تغییر چیدمان ."
                rows={5}
              />
            </FormSection>

            {/* Section 5: Cleaning */}
            <FormSection title="نظافت">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="ساعت شروع نظافت"
                  id="cleaningStart"
                  type="time"
                  value={formData.cleaningStartTime}
                  onChange={(e) => updateField('cleaningStartTime', e.target.value)}
                />
                <Input
                  label="ساعت پایان نظافت"
                  id="cleaningEnd"
                  type="time"
                  value={formData.cleaningEndTime}
                  onChange={(e) => updateField('cleaningEndTime', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GenderSelector
                  label="جنسیت انجام‌دهنده"
                  value={formData.cleaningPersonGender}
                  onChange={(value) => updateField('cleaningPersonGender', value)}
                />
                <Input
                  label="نام انجام‌دهنده نظافت"
                  id="cleaningPerson"
                  value={formData.cleaningPersonName}
                  onChange={(e) => updateField('cleaningPersonName', e.target.value)}
                  placeholder="ابراهیمی"
                />
              </div>
            </FormSection>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => setShowClearConfirm(true)}
                className="flex-1"
              >
                پاک کردن فرم
              </Button>
            </div>
          </div>

          {/* Generated Report Column */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  گزارش تولید شده
                </h2>
              </div>
              
              <div className="p-6">
                <textarea
                  readOnly
                  value={generatedReport}
                  className="w-full h-[600px] p-4 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm leading-relaxed resize-none focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div className="px-6 pb-6">
                <Button
                  variant="primary"
                  icon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  onClick={handleCopy}
                  className="w-full"
                >
                  {copied ? 'گزارش کپی شد ✓' : 'کپی گزارش'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              پاک کردن فرم
            </h3>
            <p className="text-gray-600 mb-6">
              آیا مطمئن هستید که می‌خواهید تمام اطلاعات فرم را پاک کنید؟
            </p>
            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={handleClear}
                className="flex-1"
              >
                بله، پاک کن
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1"
              >
                انصراف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
