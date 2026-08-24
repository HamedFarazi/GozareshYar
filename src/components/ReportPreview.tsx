import { CheckCircle, Copy, FileText } from 'lucide-react';

interface ReportPreviewProps {
  title: string;
  report: string;
  copied: boolean;
  onCopy: () => void;
}

export function ReportPreview({ 
  title, 
  report, 
  copied, 
  onCopy
}: ReportPreviewProps) {
  return (
    <div className="report-card premium-card card-accent-amber">
      {/* Report Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="icon-container icon-amber">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-gray-900">
                {title}
              </h2>
              <p className="text-[13px] text-gray-600 mt-1">
                گزارش نهایی آماده ارسال
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="ready-badge">
              <CheckCircle className="w-5 h-5" />
              <span>آماده ارسال</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Content */}
      <div className="mb-8">
        <div className="report-content rounded-xl min-h-[500px] max-h-[500px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-normal text-gray-800 text-[15px] leading-[2] tracking-wide font-sans">
            {report}
          </pre>
        </div>
      </div>

      {/* Copy Button */}
      <div>
        <button
          onClick={onCopy}
          className={`premium-copy-button ${copied ? 'success' : ''}`}
        >
          {copied ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span>گزارش کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="w-6 h-6" />
              <span>کپی گزارش</span>
            </>
          )}
        </button>
        {copied && (
          <p className="text-center text-sm text-green-600 mt-4 font-bold">
            ✓ گزارش با موفقیت کپی شد
          </p>
        )}
      </div>
    </div>
  );
}