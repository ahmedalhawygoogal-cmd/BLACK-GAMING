import Link from "next/link";

const terms = [
  "يتحمل المستخدم المسؤولية الكاملة عن إدخال معرّف اللاعب الصحيح، ولا يمكن استرداد المبلغ في حال إدخال معرّف خاطئ.",
  "جميع الأسعار بالجنيه المصري (EGP)، وهي قابلة للتغيير دون إشعار مسبق.",
  "أي محاولة لرفع إيصالات دفع مزيفة أو معدّلة ستؤدي إلى حظر دائم للحساب واتخاذ الإجراءات القانونية اللازمة.",
  "لا يُسمح بأي استرداد للمبلغ بعد اكتمال عملية الشحن.",
];

export default function TermsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#090C14] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-emerald-400 transition-colors hover:text-emerald-300">العودة إلى BLACK GAMING</Link>
        <p className="mt-12 text-sm font-semibold tracking-[0.2em] text-emerald-400">BLACK GAMING</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">الشروط والأحكام</h1>
        <p className="mt-5 text-sm leading-8 text-white/50">باستخدامك لخدمات BLACK GAMING، فإنك توافق على الشروط التالية:</p>
        <ol className="mt-10 grid gap-4">
          {terms.map((term, index) => (
            <li key={term} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-sm leading-8 text-white/65">
              <span className="text-lg font-bold text-emerald-400">{index + 1}</span>
              <span>{term}</span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
