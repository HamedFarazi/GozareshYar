import { useState, useEffect } from 'react';
import { 
  Copy, 
  Trash2, 
  Check, 
  FileText, 
  Info, 
  Calendar, 
  BadgeDollarSign, 
  Users, 
  MessageSquare, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { FormData } from './types';
import { generateReport, getTodayPersianDate, formatNumberWithSlashSeparators } from './utils/generateReport';
import { saveFormData, loadFormData, clearFormData } from './utils/storage';
import { FormSection } from './components/FormSection';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { GenderSelector } from './components/GenderSelector';
import { Button } from './components/Button';
import { ReportPreview } from './components/ReportPreview';
import { MobileStepper } from './components/MobileStepper';

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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step as 1 | 2 | 3 | 4 | 5);
    }
  };
  const [showMobileReport, setShowMobileReport] = useState(false);

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

  // Function to render current step content
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection 
            title="اطلاعات گزارش" 
            icon={<FileText className="w-5 h-5" />}
            description="اطلاعات اصلی گزارش روزانه"
            color="blue"
          >
            <div className="grid grid-cols-1 gap-4">
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
            </div>
          </FormSection>
        );
      case 2:
        return (
          <FormSection 
            title="آمار فروش" 
            icon={<BadgeDollarSign className="w-5 h-5" />}
            description="آمار مالی روزانه شعبه"
            color="green"
          >
            <div className="space-y-4">
              <Input
                label="مجموع فروش"
                id="totalSales"
                value={formData.totalSales}
                onChange={(e) => updateField('totalSales', e.target.value)}
                placeholder="662/490/000"
                suffix="ریال"
              />
              <Input
                label="مجموع تخفیف"
                id="totalDiscount"
                value={formData.totalDiscount}
                onChange={(e) => updateField('totalDiscount', e.target.value)}
                placeholder="0"
                suffix="ریال"
              />
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="تعداد فاکتور"
                  id="invoiceCount"
                  value={formData.invoiceCount}
                  onChange={(e) => updateField('invoiceCount', e.target.value)}
                  placeholder="15"
                />
                <Input
                  label="میانگین هر فاکتور"
                  id="averageInvoice"
                  value={formData.averageInvoice}
                  onChange={(e) => updateField('averageInvoice', e.target.value)}
                  placeholder="44/166/000"
                  suffix="ریال"
                />
              </div>
            </div>
          </FormSection>
        );
      case 3:
        return (
          <FormSection 
            title="شیفت‌ها" 
            icon={<Users className="w-5 h-5" />}
            description="اطلاعات شیفت‌های صبح و عصر"
            color="purple"
          >
            <div className="space-y-6">
              {/* Morning Shift */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">مسئول شیفت صبح</h3>
                <div className="grid grid-cols-1 gap-3">
                  <GenderSelector
                    label=""
                    value={formData.morningManagerGender}
                    onChange={(value) => updateField('morningManagerGender', value)}
                  />
                  <div>
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
                <div className="grid grid-cols-1 gap-3">
                  <GenderSelector
                    label=""
                    value={formData.eveningManagerGender}
                    onChange={(value) => updateField('eveningManagerGender', value)}
                  />
                  <div>
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
              <div className="grid grid-cols-1 gap-4">
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
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Input
                    label="ساعت بالارفتن کرکره"
                    id="shutterUp"
                    type="time"
                    value={formData.shutterUpTime}
                    onChange={(e) => updateField('shutterUpTime', e.target.value)}
                    isTimeInput={true}
                  />
                </div>
                <div>
                  <Input
                    label="ساعت پایین آمدن کرکره"
                    id="shutterDown"
                    type="time"
                    value={formData.shutterDownTime}
                    onChange={(e) => updateField('shutterDownTime', e.target.value)}
                    isTimeInput={true}
                  />
                </div>
              </div>
            </div>
          </FormSection>
        );
      case 4:
        return (
          <FormSection 
            title="نکات امروز" 
            icon={<MessageSquare className="w-5 h-5" />}
            description="رویدادها و نکات مهم روز"
            color="amber"
          >
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
        );
      case 5:
        return (
          <FormSection 
            title="نظافت" 
            icon={<Sparkles className="w-5 h-5" />}
            description="اطلاعات نظافت روزانه"
            color="cyan"
          >
            <div className="space-y-6">
              {/* Cleaning Times */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Input
                    label="ساعت شروع نظافت"
                    id="cleaningStart"
                    type="time"
                    value={formData.cleaningStartTime}
                    onChange={(e) => updateField('cleaningStartTime', e.target.value)}
                    isTimeInput={true}
                  />
                </div>
                <div>
                  <Input
                    label="ساعت پایان نظافت"
                    id="cleaningEnd"
                    type="time"
                    value={formData.cleaningEndTime}
                    onChange={(e) => updateField('cleaningEndTime', e.target.value)}
                    isTimeInput={true}
                  />
                </div>
              </div>

              {/* Cleaning Person */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">انجام‌دهنده نظافت</h3>
                <div className="grid grid-cols-1 gap-3">
                  <GenderSelector
                    label=""
                    value={formData.cleaningPersonGender}
                    onChange={(value) => updateField('cleaningPersonGender', value)}
                  />
                  <div>
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
        );
      default:
        return null;
    }
  };

  // Function to render desktop form
  const renderDesktopForm = () => (
    <div className="space-y-8">
      <FormSection 
        title="اطلاعات گزارش" 
        icon={<FileText className="w-5 h-5" />}
        description="اطلاعات اصلی گزارش روزانه"
        color="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </FormSection>

      <FormSection 
        title="آمار فروش" 
        icon={<BadgeDollarSign className="w-5 h-5" />}
        description="آمار مالی روزانه شعبه"
        color="green"
      >
        <div className="space-y-4">
          <Input
            label="مجموع فروش"
            id="totalSales"
            value={formData.totalSales}
            onChange={(e) => updateField('totalSales', e.target.value)}
            placeholder="662/490/000"
            suffix="ریال"
          />
          <Input
            label="مجموع تخفیف"
            id="totalDiscount"
            value={formData.totalDiscount}
            onChange={(e) => updateField('totalDiscount', e.target.value)}
            placeholder="0"
            suffix="ریال"
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
              label="میانگین هر فاکتور"
              id="averageInvoice"
              value={formData.averageInvoice}
              onChange={(e) => updateField('averageInvoice', e.target.value)}
              placeholder="44/166/000"
              suffix="ریال"
            />
          </div>
        </div>
      </FormSection>

      <FormSection 
        title="شیفت‌ها" 
        icon={<Users className="w-5 h-5" />}
        description="اطلاعات شیفت‌های صبح و عصر"
        color="purple"
      >
        <div className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="ساعت بالارفتن کرکره"
                id="shutterUp"
                type="time"
                value={formData.shutterUpTime}
                onChange={(e) => updateField('shutterUpTime', e.target.value)}
                isTimeInput={true}
              />
            </div>
            <div>
              <Input
                label="ساعت پایین آمدن کرکره"
                id="shutterDown"
                type="time"
                value={formData.shutterDownTime}
                onChange={(e) => updateField('shutterDownTime', e.target.value)}
                isTimeInput={true}
              />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection 
        title="نکات امروز" 
        icon={<MessageSquare className="w-5 h-5" />}
        description="رویدادها و نکات مهم روز"
        color="amber"
      >
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

      <FormSection 
        title="نظافت" 
        icon={<Sparkles className="w-5 h-5" />}
        description="اطلاعات نظافت روزانه"
        color="cyan"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="ساعت شروع نظافت"
                id="cleaningStart"
                type="time"
                value={formData.cleaningStartTime}
                onChange={(e) => updateField('cleaningStartTime', e.target.value)}
                isTimeInput={true}
              />
            </div>
            <div>
              <Input
                label="ساعت پایان نظافت"
                id="cleaningEnd"
                type="time"
                value={formData.cleaningEndTime}
                onChange={(e) => updateField('cleaningEndTime', e.target.value)}
                isTimeInput={true}
              />
            </div>
          </div>

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

      <div className="pt-4">
        <Button
          variant="secondary"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => setShowClearConfirm(true)}
          fullWidth
        >
          پاک کردن فرم
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
      {/* Premium Header with Gradient */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 backdrop-blur-md border-b border-blue-100/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              {/* Mobile Full Report Button */}
              <button 
                onClick={() => setShowMobileReport(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md hover:shadow-lg transition-shadow"
              >
                <FileText className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="hidden lg:block premium-header">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    گزارش‌یار
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-600 mt-1">
                    ساخت سریع گزارش روزانه شعبه
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-base font-medium text-gray-900">{getTodayPersianDate()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 page-padding">
        {/* Premium Information Banner */}
        <div className="mb-10">
          <div className="info-banner">
            <div className="info-banner-icon">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base text-blue-800 font-bold">
                اطلاعات به صورت خودکار ذخیره می‌شود
              </p>
              <p className="text-sm text-blue-700 mt-2">
                پس از پر کردن فرم، گزارش را کپی کرده و در گروه‌های کاری ارسال کنید
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-10">
          {/* Left Column: Form */}
          <div className="lg:hidden">
            {/* Mobile Stepper */}
            <MobileStepper
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
            
            {/* Mobile Form Step */}
            <div className="mb-8">
              {renderCurrentStep()}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-between items-center gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => handleStepChange(currentStep - 1)}
                  className={`
                    flex items-center justify-center gap-2 
                    px-5 py-3 rounded-xl 
                    bg-gradient-to-r from-gray-100 to-gray-50 
                    border border-gray-200
                    text-gray-700 font-medium
                    transition-all duration-200
                    hover:bg-gradient-to-r hover:from-gray-50 hover:to-white
                    hover:border-gray-300 hover:shadow-sm
                    min-h-[48px] min-w-[120px]
                  `}
                >
                  <ChevronRight className="w-5 h-5" />
                  <span>مرحله قبل</span>
                </button>
              )}
              
              {currentStep < 5 && (
                <button
                  onClick={() => handleStepChange(currentStep + 1)}
                  className={`
                    flex items-center justify-center gap-2 
                    px-5 py-3 rounded-xl 
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    text-white font-bold
                    transition-all duration-200
                    hover:shadow-lg hover:shadow-blue-500/30
                    hover:from-blue-600 hover:to-indigo-700
                    min-h-[48px] min-w-[120px]
                    ${currentStep > 1 ? 'flex-1' : 'w-full'}
                  `}
                >
                  <span>مرحله بعد</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              {currentStep === 5 && (
                <button
                  onClick={handleCopy}
                  className={`
                    flex items-center justify-center gap-2 
                    px-5 py-3 rounded-xl 
                    bg-gradient-to-r from-green-500 to-emerald-600
                    text-white font-bold
                    transition-all duration-200
                    hover:shadow-lg hover:shadow-green-500/30
                    hover:from-green-600 hover:to-emerald-700
                    min-h-[48px]
                    w-full
                  `}
                >
                  <Check className="w-5 h-5" />
                  <span>تکمیل گزارش ✓</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Form */}
          <div className="hidden lg:block space-y-8">
            {renderDesktopForm()}
          </div>

          {/* Right Column: Generated Report */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ReportPreview
              title="گزارش تولید شده"
              report={generatedReport}
              copied={copied}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500/95 to-indigo-600/95 backdrop-blur-md border-t border-blue-300/30 p-4">
        <button
          onClick={handleCopy}
          className={`premium-copy-button ${copied ? 'success' : ''}`}
        >
          {copied ? (
            <>
              <Check className="w-6 h-6" />
              <span>گزارش کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="w-6 h-5" />
              <span>کپی گزارش</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Full Screen Report Modal */}
      {showMobileReport && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between">
            <button
              onClick={() => setShowMobileReport(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-xl font-bold text-white">گزارش کامل</h2>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>

          {/* Report Content */}
          <div className="p-4 h-[calc(100vh-120px)] overflow-y-auto">
            <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl border border-amber-100 p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">گزارش تولید شده</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-bold">آماده ارسال</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-xl border border-amber-200 p-4">
                <pre className="whitespace-pre-wrap font-normal text-gray-800 text-[15px] leading-[2] tracking-wide font-sans">
                  {generatedReport}
                </pre>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500/95 to-indigo-600/95 backdrop-blur-md border-t border-blue-300/30 p-4">
            <button
              onClick={handleCopy}
              className={`premium-copy-button ${copied ? 'success' : ''}`}
            >
              {copied ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>گزارش کپی شد</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-5" />
                  <span>کپی گزارش</span>
                </>
              )}
            </button>
            {copied && (
              <p className="text-center text-sm text-green-100 mt-3 font-bold animate-pulse">
                ✓ گزارش با موفقیت کپی شد
              </p>
            )}
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  پاک کردن فرم
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  تمام اطلاعات پاک خواهد شد
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              آیا مطمئن هستید که می‌خواهید تمام اطلاعات فرم را پاک کنید؟
              <span className="block text-sm text-gray-500 mt-2">
                این عمل قابل بازگشت نیست. اطلاعات ذخیره‌شده در مرورگر نیز پاک می‌شود.
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
    </div>
  );
}

export default App;