# راهنمای استقرار در Vercel

## روش اول: استقرار از طریق Git

### مرحله 1: آپلود پروژه به GitHub

```bash
# اگر هنوز git init نکردید
git init

# افزودن تمام فایل‌ها
git add .

# ایجاد اولین commit
git commit -m "Initial commit: Gozareshyar app"

# اضافه کردن remote repository (آدرس GitHub خود را جایگزین کنید)
git remote add origin https://github.com/YOUR_USERNAME/gozareshyar.git

# push کردن به GitHub
git push -u origin main
```

### مرحله 2: استقرار در Vercel

1. به [vercel.com](https://vercel.com) بروید
2. با حساب GitHub خود وارد شوید
3. روی دکمه **"Add New..."** کلیک کنید
4. گزینه **"Project"** را انتخاب کنید
5. مخزن `gozareshyar` را پیدا کرده و روی **"Import"** کلیک کنید
6. تنظیمات زیر را بررسی کنید:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
7. روی **"Deploy"** کلیک کنید

پس از چند دقیقه، پروژه شما آماده است! 🎉

---

## روش دوم: استقرار مستقیم از CLI

### نصب Vercel CLI

```bash
npm install -g vercel
```

### استقرار پروژه

```bash
# در پوشه پروژه
vercel

# برای production
vercel --prod
```

---

## به‌روزرسانی پروژه

پس از استقرار اولیه، هر بار که تغییری در کد ایجاد کنید:

```bash
git add .
git commit -m "توضیحات تغییرات"
git push
```

Vercel به صورت خودکار نسخه جدید را build و deploy می‌کند.

---

## تنظیمات دامنه سفارشی (اختیاری)

1. در داشبورد Vercel، پروژه خود را باز کنید
2. به بخش **"Settings"** بروید
3. روی **"Domains"** کلیک کنید
4. دامنه دلخواه خود را اضافه کنید
5. DNS را طبق راهنمای Vercel تنظیم کنید

---

## نکات مهم

- ✅ این پروژه بدون نیاز به تنظیمات اضافی در Vercel کار می‌کند
- ✅ هیچ متغیر محیطی (Environment Variable) نیاز نیست
- ✅ هیچ دیتابیس یا بک‌اند خارجی مورد نیاز نیست
- ✅ همه اطلاعات در مرورگر کاربر ذخیره می‌شود

---

## مشکلات رایج و راه‌حل

### Build شکست خورد
- مطمئن شوید `pnpm install` با موفقیت اجرا شده است
- بررسی کنید که تمام dependency ها نصب شده باشند

### صفحه خالی نمایش داده می‌شود
- Output Directory را بررسی کنید (باید `dist` باشد)
- مطمئن شوید Build Command درست است (`pnpm build`)

### فونت فارسی نمایش داده نمی‌شود
- فونت Vazirmatn از CDN لود می‌شود، اتصال اینترنت را بررسی کنید

---

## لینک‌های مفید

- [مستندات Vercel](https://vercel.com/docs)
- [مستندات Vite](https://vitejs.dev/)
- [GitHub Repository](https://github.com)
