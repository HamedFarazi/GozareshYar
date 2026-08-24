import type { ReactNode } from 'react';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { CheckCircle, Copy } from 'lucide-react';

interface ReportPreviewProps {
  title: string;
  report: string;
  copied: boolean;
  onCopy: () => void;
  statusBadge?: ReactNode;
}

export function ReportPreview({ 
  title, 
  report, 
  copied, 
  onCopy, 
  statusBadge 
}: ReportPreviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-gray-900">
              {title}
            </h2>
            {statusBadge && (
              <div className="flex items-center gap-2">
                {statusBadge}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 min-h-[500px] max-h-[500px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-normal text-gray-800 text-sm leading-relaxed tracking-wide font-sans">
            {report}
          </pre>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Button
          variant={copied ? "success" : "primary"}
          size="lg"
          icon={copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          onClick={onCopy}
          fullWidth
          className="py-4"
        >
          {copied ? 'گزارش کپی شد' : 'کپی گزارش'}
        </Button>
        {copied && (
          <p className="text-center text-sm text-green-600 mt-3 font-medium">
            ✓ گزارش آماده ارسال است
          </p>
        )}
      </div>
    </div>
  );
}