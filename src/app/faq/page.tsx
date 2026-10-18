import Link from "next/link";

const faqs = [
  ["كيف أتابع حالة طلبي باستخدام كود الطلب؟", "بعد إرسال طلبك، ستتلقى كود الطلب. استخدمه في صفحة المتابعة أو أرسله إلى الدعم عبر واتساب لمعرفة آخر تحديثات طلبك."],
  ["ماذا يحدث إذا تم رفض إيصال SMS أو كان غير واضح؟", "سنطلب منك إعادة رفع صورة واضحة وكاملة للإيصال الأصلي. تأكد من ظهور رقم العملية والمبلغ والتاريخ بوضوح قبل الإرسال."],
  ["ما طرق الدفع المتاحة؟", "نوفر الدفع عبر Vodafone Cash وInstaPay، وقد تتوفر محافظ إلكترونية أخرى وفق الخيارات الظاهرة أثناء إتمام الطلب."],
  ["لماذا يجب إرسال رسالة واتساب بعد الدفع؟", "تساعدنا رسالة واتساب على ربط إيصال الدفع بطلبك بسرعة، ومراجعة البيانات يدوياً لضمان وصول الشحن إلى الحساب الصحيح."],
  ["هل توجد رسوم إضافية عند استخدام المحافظ الإلكترونية؟", "لا نضيف رسوماً خفية من جانبنا. قد تفرض جهة الدفع أو المحفظة رسوماً خاصة بها، إن وُجدت، وتظهر لك قبل تأكيد العملية."],
  ["كم يستغرق التحقق من الدفع؟", "عادةً يتم التحقق خلال دقائق في أوقات العمل. قد يتأخر الرد قليلاً أثناء فترات الضغط أو عند الحاجة إلى مراجعة إضافية للإيصال."],
  ["ماذا أفعل إذا أدخلت Player ID خاطئاً؟", "تواصل مع الدعم فوراً عبر واتساب قبل اكتمال الشحن. بعد اكتمال العملية لا يمكن تعديل المعرّف أو استرداد المبلغ."],
];

export default function FAQPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#090C14] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-emerald-400 transition-colors hover:text-emerald-300">العودة إلى BLACK GAMING</Link>
        <p className="mt-12 text-sm font-semibold tracking-[0.2em] text-emerald-400">مركز المساعدة</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">الأسئلة الشائعة</h1>
        <p className="mt-5 text-sm leading-8 text-white/50">إجابات واضحة على أكثر الأسئلة شيوعاً حول الدفع والطلبات والشحن.</p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="group border-b border-white/[0.08] p-6 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold marker:hidden">
                <span>{question}</span>
                <span aria-hidden="true" className="text-xl font-light text-emerald-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/55">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
