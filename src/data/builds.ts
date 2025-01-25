import { Build } from '../types/build';

export const builds: Build[] = [
  {
    id: 'pro-gaming',
    name: {
      en: "Pro Gaming",
      fa: "سیستم مخصوص گیمینگ"
    },
    image: "https://i.imgur.com/bmA6GuL.jpeg",
    specs: {
      en: "RTX 4080 • i9-13900K • 32GB RAM",
      fa: "RTX 4080 • i9-13900K • 32GB رم"
    },
    description: {
      en: "Ultimate gaming rig designed for competitive esports and streaming. Features premium cooling and RGB lighting.",
      fa: "سیستم گیمینگ نهایی طراحی شده برای ای‌اسپورت رقابتی و استریم. دارای خنک‌کننده حرفه‌ای و نورپردازی RGB."
    },
    price: 2999,
    features: {
      en: [
        "360mm AIO Liquid Cooling",
        "Custom RGB Setup",
        "PCIe Gen 4 NVMe SSD",
        "850W Gold PSU"
      ],
      fa: [
        "خنک‌کننده مایع 360 میلی‌متری",
        "نورپردازی RGB سفارشی",
        "اس‌اس‌دی NVMe نسل 4",
        "پاور 850 وات گلد"
      ]
    }
  },
  {
    id: 'content-creator',
    name: {
      en: "Content Creator",
      fa: "سیستم مخصوص تولید محتوا"
    },
    image: "https://i.imgur.com/RjptuHX.jpeg",
    specs: {
      en: "RTX 4070 • R9 7900X • 64GB RAM",
      fa: "RTX 4070 • R9 7900X • 64GB رم"
    },
    description: {
      en: "Optimized for video editing, streaming, and content creation. Balanced for both work and gaming.",
      fa: "بهینه‌سازی شده برای ویرایش ویدیو، استریم و تولید محتوا. متعادل برای کار و بازی."
    },
    price: 2499,
    features: {
      en: [
        "Dual Storage Solution",
        "Thunderbolt 4 Support",
        "Professional Grade Cooling",
        "Color Calibrated Setup"
      ],
      fa: [
        "راه‌حل ذخیره‌سازی دوگانه",
        "پشتیبانی تاندربولت 4",
        "خنک‌کننده حرفه‌ای",
        "تنظیم رنگ کالیبره شده"
      ]
    }
  },
  {
    id: 'workstation',
    name: {
      en: "Workstation",
      fa: "سیتم مخصوص کارهای گرافیکی"
    },
    image: "https://i.imgur.com/KxArR5o.jpeg",
    specs: {
      en: "RTX 4090 • TR 7980X • 128GB RAM",
      fa: "RTX 4090 • TR 7980X • 128GB رم"
    },
    description: {
      en: "Professional workstation for 3D rendering, CAD, and intensive computational tasks.",
      fa: "ایستگاه کاری حرفه‌ای برای رندر سه بعدی، طراحی CAD و پردازش‌های سنگین."
    },
    price: 4999,
    features: {
      en: [
        "ECC Memory Support",
        "RAID Storage Configuration",
        "Quadro Graphics Option",
        "Server Grade Components"
      ],
      fa: [
        "پشتیبانی از حافظه ECC",
        "پیکربندی ذخیره‌سازی RAID",
        "گزینه گرافیک Quadro",
        "قطعات سرور گرید"
      ]
    }
  }
];