import { useState, useEffect } from 'react';
import { Copy, Trash2, Check, FileText, Info, Calendar, Building, CheckCircle, Download } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Compact Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  گزارش‌یار
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  ساخت سریع گزارش روزانه شعبه
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{getTodayPersianDate()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Info Banner */}
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-800">
                اطلاعات فرم به صورت خودکار در مرورگر شما ذخیره می‌شود.
              </p>
              <p className="text-xs text-blue-700 mt-1">
                گزارش آماده شده را کپی کرده و در گروه‌های کاری ارسال کنید.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column: Form */}
          <div className="space-y-6">
            {/* Section 1: Report Info */}
            <FormSection title="اطلاعات گزارش">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="تاریخ گزارش"
                  id="reportDate"
                  value={formData.reportDate}
                  onChange={(e) => updateField('reportDate', e.target.value)}
                  placeholder="۱۴۰۵/۰۶/۰۱"
                  helperText="فرمت: سال/ماه/روز"
                />
                <Input
                  label="نام شعبه"
                  id="branchName"
                  value={formData.branchName}
                  onChange={(e) => updateField('branchName', e.target.value)}
                  placeholder="هایپراستار"
                  helperText="نام کامل شعبه"
                />
              </div>
            </FormSection>

            {/* Section 2: Sales Stats */}
            <FormSection title="آمار فروش">
              <div className="space-y-4">
                <Input
                  label="مجموع فروش (ریال)"
                  id="totalSales"
                  value={formData.totalSales}
                  onChange={(e) => updateField('totalSales', e.target.value)}
                  placeholder="662/490/000"
                  helperText="مثال: 44/600 یعنی 44 هزار و 600 ریال"
                />
                <Input
                  label="مجموع تخفیف (ریال)"
                  id="totalDiscount"
                  value={formData.totalDiscount}
                  onChange={(e) => updateField('totalDiscount', e.target.value)}
                  placeholder="0"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>
            </FormSection>

            {/* Section 3: Shifts */}
            <FormSection title="شیفت‌ها">
              <div className="space-y-5">
                {/* Morning Shift */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">مسئول شیفت صبح</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <GenderSelector
                      label=""
                      value={formData.morningManagerGender}
                      onChange={(value) => updateField('morningManagerGender', value)}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="نام مسئول"
                        id="morningManager"
                        value={formData.morningManagerName}
                        onChange={(e) => updateField('morningManagerName', e.target.value)}
                        placeholder="شهبازی"
                      />
                    </div>
                  </div>
                </div>

                {/* Evening Shift */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">مسئول شیفت عصر</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <GenderSelector
                      label=""
                      value={formData.eveningManagerGender}
                      onChange={(value) => updateField('eveningManagerGender', value)}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="نام مسئول"
                        id="eveningManager"
                        value={formData.eveningManagerName}
                        onChange={(e) => updateField('eveningManagerName', e.target.value)}
                        placeholder="پیشانی دار"
                      />
                    </div>
                  </div>
                </div>

                {/* Attendance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="تعداد حاضرین شیفت صبح"
                    id="morningAttendance"
                    value={formData.morningAttendance}
                    onChange={(e) => updateField('morningAttendance', e.target.value)}
                    placeholder="2"
                  />
                  <Input
                    label="تعداد حاضرین شیفت عصر"
                    id="eveningAttendance"
                    value={formData.eveningAttendance}
                    onChange={(e) => updateField('eveningAttendance', e.target.value)}
                    placeholder="2"
                  />
                </div>

                {/* Shutter Times */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="ساعت بالارفتن کرکره"
                      id="shutterUp"
                      type="time"
                      value={formData.shutterUpTime}
                      onChange={(e) => updateField('shutterUpTime', e.target.value)}
                      helperText="فرمت ۲۴ ساعته"
                    />
                  </div>
                  <div>
                    <Input
                      label="ساعت پایین آمدن کرکره"
                      id="shutterDown"
                      type="time"
                      value={formData.shutterDownTime}
                      onChange={(e) => updateField('shutterDownTime', e.target.value)}
                      helperText="فرمت ۲۴ ساعته"
                    />
                  </div>
                </div>
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
                rows={4}
                helperText="هر نکته در یک خط جدید"
              />
            </FormSection>

            {/* Section 5: Cleaning */}
            <FormSection title="نظافت">
              <div className="space-y-5">
                {/* Cleaning Times */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="ساعت شروع نظافت"
                      id="cleaningStart"
                      type="time"
                      value={formData.cleaningStartTime}
                      onChange={(e) => updateField('cleaningStartTime', e.target.value)}
                      helperText="فرمت ۲۴ ساعته"
                    />
                  </div>
                  <div>
                    <Input
                      label="ساعت پایان نظافت"
                      id="cleaningEnd"
                      type="time"
                      value={formData.cleaningEndTime}
                      onChange={(e) => updateField('cleaningEndTime', e.target.value)}
                      helperText="فرمت ۲۴ ساعته"
                    />
                  </div>
                </div>

                {/* Cleaning Person */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">انجام‌دهنده نظافت</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <GenderSelector
                      label=""
                      value={formData.cleaningPersonGender}
                      onChange={(value) => updateField('cleaningPersonGender', value)}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="نام انجام‌دهنده"
                        id="cleaningPerson"
                        value={formData.cleaningPersonName}
                        onChange={(e) => updateField('cleaningPersonName', e.target.value)}
                        placeholder="ابراهیمی"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Action Buttons - Form Side */}
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

          {/* Right Column: Generated Report */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Report Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg border border-blue-100">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        گزارش تولید شده
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">
                          آماده ارسال
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Building className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Report Content */}
              <div className="p-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[600px] max-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-medium text-gray-800 text-base leading-relaxed tracking-wide font-sans">
                    {generatedReport}
                  </pre>
                </div>
              </div>

              {/* Action Buttons - Report Side */}
              <div className="px-6 pb-6">
                <div className="space-y-3">
                  <Button
                    variant={copied ? "success" : "primary"}
                    size="lg"
                    icon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    onClick={handleCopy}
                    className="w-full py-4"
                  >
                    {copied ? 'گزارش کپی شد ✓' : 'کپی گزارش'}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    گزارش کپی شده را در گروه‌های کاری پیست کنید
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">راهنمای سریع</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• فرم را پر کنید و گزارش به صورت زنده تولید می‌شود</li>
                    <li>• اعداد فروش با جداکننده / فرمت می‌شوند</li>
                    <li>• زمان‌ها به صورت ۲۴ ساعته ثبت می‌شوند</li>
                    <li>• اطلاعات به صورت خودکار ذخیره می‌شود</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-50 p-2 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  پاک کردن فرم
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  تمام اطلاعات فرم پاک خواهد شد
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              آیا مطمئن هستید که می‌خواهید تمام اطلاعات فرم را پاک کنید؟
              <span className="block text-sm text-gray-500 mt-1">
                این عمل قابل بازگشت نیست.
              </span>
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

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <Button
          variant={copied ? "success" : "primary"}
          size="lg"
          icon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          onClick={handleCopy}
          className="w-full"
        >
          {copied ? 'گزارش کپی شد ✓' : 'کپی گزارش'}
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              گزارش‌یار • ابزار داخلی مدیریت شعبه
            </p>
            <p className="text-xs text-gray-500 mt-1">
              طراحی شده برای استفاده سریع و آسان از موبایل و دسکتاپ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;