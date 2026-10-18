import Link from "next/link";

const points = [
  ["جمع البيانات", "نحن نجمع فقط معرّف اللاعب (Player ID)، ورقم الهاتف، وصورة إيصال الدفع اللازمة لمعالجة طلبك."],
  ["استخدام البيانات", "تُستخدم هذه البيانات حصرياً لتنفيذ الطلب، والتحقق من عملية الدفع، ومنع محاولات الاحتيال."],
  ["أمن البيانات", "نحفظ البيانات بشكل آمن في Supabase. نحن لا نخزّن مطلقاً أرقام بطاقات الائتمان أو أرقام PIN أو كلمات مرور المحافظ الإلكترونية."],
  ["حذف البيانات", "يحق للمستخدم طلب حذف بياناته الشخصية في أي وقت من خلال التواصل مع فريق الدعم."],
];

export default function PrivacyPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#090C14] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-emerald-400 transition-colors hover:text-emerald-300">العودة إلى BLACK GAMING</Link>
        <p className="mt-12 text-sm font-semibold tracking-[0.2em] text-emerald-400">BLACK GAMING</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">سياسة الخصوصية</h1>
        <p className="mt-5 text-sm leading-8 text-white/50">نلتزم بحماية بياناتك والتعامل معها بالحد الأدنى اللازم لتقديم خدمة شحن موثوقة وآمنة.</p>
        <div className="mt-10 grid gap-4">
          {points.map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-white/60">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
