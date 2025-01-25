import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'gaming-beast',
    name: {
      en: "Gaming Beast Pro",
      fa: "گیمینگ بیست پرو"
    },
    image: "https://i.imgur.com/yXbCQ3Z.jpeg",
    shortDescription: {
      en: "Unleash the ultimate gaming experience with powerful hardware and stunning RGB aesthetics, designed to push your gameplay to the next level. This machine is engineered for enthusiasts who demand the best. With an Intel i9 processor and an RTX 4080 GPU, it handles even the most demanding AAA games at ultra settings without a hitch. Coupled with 32GB of DDR5 RAM and a super-fast 2TB NVMe SSD, expect seamless gaming and lightning-fast load times.",
      fa: "عملکرد نهایی گیمینگ را با سخت‌افزار قدرتمند و زیبایی‌های RGB باز کنید، طراحی شده برای ارتقا تجربه بازی شما. این دستگاه برای علاقه‌مندانی که بهترین‌ها را می‌خواهند، مهندسی شده است. با پردازنده Intel i9 و گرافیک RTX 4080، حتی بازی‌های AAA با تنظیمات اولترا را بدون مشکل اجرا می‌کند. همراه با 32GB حافظه DDR5 و یک SSD NVMe با ظرفیت 2TB، تجربه‌ای بی‌وقفه از بازی و زمان بارگذاری فوق‌العاده سریع را خواهید داشت."
    },
    price: 2499,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "Intel i9-13900K",
      gpu: "RTX 4080 16GB",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },
  {
    id: 'stealth-pro',
    name: {
      en: "Elite Gamer",
      fa: "الیت گیمر"
    },
    image: "https://i.imgur.com/2KY3f6R.jpeg",
    shortDescription: {
      en: "A sleek, minimalist design paired with cutting-edge performance, perfect for professionals who demand both style and power from their setup. Featuring the powerful AMD Ryzen 9 processor and the latest RTX 4070 Ti graphics card, this rig offers smooth multitasking and stunning visuals for productivity and gaming alike. With 64GB of RAM and a 4TB NVMe SSD, you can expect top-tier performance across a range of professional applications, from video editing to 3D modeling.",
      fa: "طراحی براق و مینیمالیستی همراه با عملکرد پیشرفته، ایده‌آل برای حرفه‌ای‌هایی که به دنبال استایل و قدرت در تنظیمات خود هستند. با پردازنده قدرتمند AMD Ryzen 9 و کارت گرافیک RTX 4070 Ti، این سیستم عملکرد بی‌نظیری را برای کارهای چندگانه و گرافیک خیره‌کننده در تولید محتوا و گیمینگ ارائه می‌دهد. با 64GB حافظه رم و SSD NVMe 4TB، می‌توانید انتظار عملکرد سطح بالا را در برنامه‌های حرفه‌ای مختلف، از ویرایش ویدیو تا مدل‌سازی سه‌بعدی داشته باشید."
    },
    price: 2199,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "AMD Ryzen 9 7950X",
      gpu: "RTX 4070 Ti",
      ram: "64GB DDR5",
      storage: "4TB NVMe SSD"
    }
  },
  {
    id: 'creator-elite',
    name: {
      en: "Creator Elite",
      fa: "کریتور الیت"
    },
    image: "https://i.imgur.com/5BKcXLp.jpeg",
    shortDescription: {
      en: "Engineered specifically for content creators and streamers, offering unparalleled performance in video editing, 3D rendering, and live streaming. With the Intel i9-14900K processor and the RTX 4090 24GB graphics card, this machine is ready to handle even the most resource-intensive tasks. Whether you're editing 8K video, rendering complex 3D models, or streaming to a global audience, the Creator Elite delivers top-tier results every time. Its 128GB DDR5 RAM and 8TB SSD provide ample space and speed for even the largest projects.",
      fa: "ویژه‌سازی شده برای تولیدکنندگان محتوا و استریمرها، با عملکرد بی‌نظیر در ویرایش ویدئو، رندرینگ سه‌بعدی و استریم زنده. با پردازنده Intel i9-14900K و کارت گرافیک RTX 4090 24GB، این دستگاه آماده است تا حتی سنگین‌ترین کارها را نیز با بهترین کیفیت انجام دهد. چه در حال ویرایش ویدیو 8K، رندرینگ مدل‌های سه‌بعدی پیچیده یا استریم به یک مخاطب جهانی باشید، کریتور الیت نتایج سطح بالا را در هر بار تحویل می‌دهد. 128GB رم DDR5 و 8TB SSD فضای کافی و سرعت لازم برای انجام بزرگترین پروژه‌ها را فراهم می‌کند."
    },
    price: 3299,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "Intel i9-14900K",
      gpu: "RTX 4090 24GB",
      ram: "128GB DDR5",
      storage: "8TB NVMe SSD"
    }
  },
  {
    id: 'compact-powerhouse',
    name: {
      en: "Compact Powerhouse",
      fa: "پاورهاوس فشرده"
    },
    image: "https://i.imgur.com/LTdpDGY.jpeg",
    shortDescription: {
      en: "A compact design without compromising on performance—experience top-tier power in a space-efficient form, ideal for home offices or small setups. Powered by an AMD Ryzen 7 7800X3D processor and an RTX 4070 GPU, this system provides exceptional performance for both gaming and professional tasks. The 32GB of DDR5 RAM and 2TB SSD ensure smooth operation even with demanding workloads, while the small form factor fits perfectly in any workspace.",
      fa: "طراحی فشرده بدون فدا کردن عملکرد—قدرت سطح بالا را در یک فرم کارآمد از نظر فضا تجربه کنید، ایده‌آل برای دفاتر خانگی یا تنظیمات کوچک. با پردازنده AMD Ryzen 7 7800X3D و گرافیک RTX 4070، این سیستم عملکرد استثنایی را هم برای گیمینگ و هم برای کارهای حرفه‌ای ارائه می‌دهد. 32GB رم DDR5 و SSD 2TB عملکرد روان را حتی با کارهای سنگین تضمین می‌کند، در حالی که ابعاد کوچک آن به راحتی در هر فضای کاری جا می‌شود."
    },
    price: 1999,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 4070 12GB",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },

  // Additional PCs

  {
    id: 'FS-Meteorology',
    name: {
      en: "FS-Meteorology",
      fa: "کامپیوتر دسکتاپ فاطر "
    },
    image: "https://i.imgur.com/7KSKyPI.jpeg",
    shortDescription: {
      en: "Fater FS-Meteorology System: Fully supports meteorology software like IAMS, Climate Change Detection, MeteoNorm, RayMan, and more. Features include a high-end FG-800W case with ARGB fans, tempered glass panels, 360mm liquid cooling support, and future upgrade compatibility. Specs: Z790 motherboard, Intel Core i9-12900K CPU, Nvidia RTX 4060 TI 16GB GPU, 192GB DDR5 RAM, 16TB RAID-configured Samsung M2 storage, and a 1250W gold-certified power supply. Pre-installed with Windows 11 Pro—just connect your peripherals and get started. Professionally factory-assembled to international standards.",
      fa: "سیستم متالوژی : کامپیوتر هواشناسی فاطر مدل FS-Meteorology تمامی نیازمندیهای نرم افزار های متالوژی نظیر IAMS، Climate Change Detection، MeteoNorm، MankenDall، RayMan، LARS-WG، SDSM، Heat_index، Wind_Chill، UPC، Gravity Acceleration Calculation، Statistics Calculation و نرم افزار های Meteorology مشابه را به خوبی پاسخ می‌دهد. این سیستم از کیس حرفه ای فاطر مدل FG-800W بهره مند است. این کیس با شمایلی منحصر به فرد و مشخصاتی بالارده، مجهز بودن به 4 عدد فن پرقدرت ARGB، طراحی دقیق محل قرار گیری قطعات، مهندسی سیستم همرفت هوایی، پورت های کافی در پنل جلو، جنس آلیاز سبک و ضد تشعشع و دافع نویز، تعداد مناسب جایگاه پذیرش درآور های 2.5 و 3.5 اینچی، پشتیبانی از سیستم خنک کننده مایع 360، پشتیبانی از کارت گرافیک های سه فن تا طول 41 سانتیمتر و سازگاری با انواع مادر برد ها دست شما را برای ارتقا های آینده کاملا باز گذاشته است. در زمینه‌ی طراحی هم فاطر به استفاده از شیشه‌های حرارت دیده برای دو طرف کیس و نورپردازی‌های متنوع RGB هم چشم پوشی نکرده است. روی این مدل، مادربرد مدل Z790 نصب شده است، وظیفه تامین انرژی مورد نیاز این سیستم توسط پاور قدرتمند 1250 واتی طلایی فاطر مدل TX1250 با 7 سال گارانتی تعویض تامین میگردد. همچنین این سیستم مجهز به پردازنده Intel Core i9 12900K است که توسط خنک کننده مایع Fater FW-360R3B1 به بهترین شکل ممکن خنک سازی میگردد در کنار کارت گرافیک Nvidia GeForce RTX 4060 TI 16GB در این سیستم 192 گیگابایت رم DDR5 و 16 ترابایت حافظه پرسرعت M2 SAMSUNG PRO که بصورت 4 لاین 4 ترابایتی با یک دیگر RAID شده اند، قرار داده شده است و به آخرین نسخه ویندوز 11 پرو مجهز است و تنها کافی است آن را به موس و کیبورد و مانیتور خود متصل نموده و از آن لذت ببرید. این سیستم به صورت کارخانه ای با پلمپ هلوگرامی برند فاطر ارائه میگردد. ویژگی سیستم های اسمبل شده کارخانه ای ای مانند فاطر این است که علاوه بر استفاده از قطعات نو، قطعات اصل، خمیر سیلیکون گرید بالا و با کیفیت، به صورت اصولی و حرفه ای براساس استاندارد های بین المللی اسمبل میگردد."
    },
    price: 2899,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "Intel Core i9-14900K",
      gpu: "RTX 4060 Ti 16GB",
      ram: "124GB DDR5",
      storage: "4TB NVMe SSD"
    }
  },

  {
    id: 'TZ14700KF MAX GAME',
    name: {
      en: "TZ14700KF MAX GAME",
      fa: "کامپیوتر دسکتاپ تک زون"
    },
    image: "https://i.imgur.com/QlgW1lK.jpeg",
    shortDescription: {
      en: "TZ14700KF MAX GAME Gaming System: Built for professional gaming, featuring top-tier components. Powered by the latest Intel Core i7-14700KF processor (up to 5.6GHz) paired with an RTX 4070 12GB GPU for seamless performance. Includes an ASUS Z690 GAMING WIFI motherboard, dual 16GB RGB RAM (6200MHz), and a 240mm RGB liquid cooler for optimal temperature control. Storage includes 1TB Samsung M.2 PCIe4 for lightning-fast load times and 1TB SSD for extra data. Housed in the sleek GAMEMAX HYPE Black case, this system delivers power and style. Just press Power, and let FAST BEAST do the rest!",
      fa: "سیستم گیمینگ TZ14700KF MAX GAME همانطور که از نامش پیداست می تواند به عنوان یک سیستم حرفه ای گیمینگ مورد استفاده قرار بگیرد. استفاده از به روزترین و با کیفیت ترین قطعات برندهای معتبر مادربرد ، پردازنده و گرافیک توانسته است این شاهکار زیبا را در خدمت شما پدید آورد. پردازش سیستم بر عهده پردازنده اینتل Core i7 14700KF جدیدترین نسل پردازنده هاست با سرعت پردازش تا 5.6 هرتز که در ترکیب با کارت گرافیک RTX 4070 12GB خیال شما را در انجام هر گونه امور سنگین و پیچیده راحت می کند.مادربرد Z690 ASUS GAMING WIFI از برند ایسوز به به همراه دو عدد رم 16GB RGB با سرعت خیره کننده 6200همراه شماست! تا تجربه لذت اجرای روان و FPS بالای بازی ها را ببرید.برای کنترل دمای پردازنده از خنک کننده آبی 240 RGB استفاده شده برای این پردازنده کافی به نظر میرسد.فضای ذخیره پرسرعت یک ترابایت M.2. PCIE4 ساخت سامسونگ بارگذاری سریع برنامه ها و بازی ها را در کسری از ثانیه رقم میزند. و فضای پشتیبان ذخیره یک ترابایت SSD برای نگه داری باقی اطلاعات عالی به نظر میرسد . ترکیب این امکانات جذاب و پرقدرت در کنار استفاده از کیس GAMEMAX HYPE Black یکی از بهترین انتخاب ها برای انجام کارهاست تنها چیزی که نیاز دارید فشردن دکمه Power است! باقی مراحل را به عهده FAST BEAST بگذارید!!"
    },
    price: 2599,
    category: {
      en: "pcs",
      fa: "کامپیوترها"
    },
    specs: {
      processor: "Intel® Core™ i7-14700KF Processor",
      gpu: "RTX 4070 12Gb",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },

  {
    id: 'ROG Swift OLED PG49WCD',
    name: {
      en: "ROG Swift OLED PG49WCD",
      fa: "مانیتور ایسوس  سایز 49 اینچ"
    },
    image: "https://i.imgur.com/I8GaDRA.jpeg",
    shortDescription: {
      en: "The ASUS ROG Swift OLED PG49WCD gaming monitor features a 49-inch curved QD-OLED panel with a 1800R curvature, offering exceptional DQHD resolution (5120 x 1440). This monitor provides a smooth and responsive gaming experience with a 144Hz refresh rate and a fast 0.03ms (GTG) response time.To ensure the longevity of the QD-OLED and optimal performance, this monitor includes a heatsink and custom enhanced graphene film on the back of the panel, reducing the monitor's temperature and minimizing the risk of burn-in. With advanced QD-OLED technology, gain an advantage in games and experience clear and fast images.",
      fa: "مانیتور خمیده گیمینگ ایسوس مدل ROG Swift OLED PG49WCD با پنل 49 اینچی خمیده QD-OLED و انحنای 1800R وضوح فوق‌العاده‌ DQHD (5120 x 1440) را ارائه می‌دهد این مانیتور با نرخ تازه‌سازی 144 هرتز و زمان پاسخ‌گویی سریع 0.03 میلی‌ثانیه (GTG) تجربه‌ای نرم و روان را برای گیم‌پلی‌های هیجان‌انگیز فراهم می‌کند برای اطمینان از طول عمر QD-OLED و عملکرد بهینه این مانیتور شامل هیت‌سینک و فیلم گرافن سفارشی بهبود‌یافته در پشت پنل است که دمای مانیتور را کاهش داده و خطر سوختگی را به حداقل می‌رساند با فناوری پیشرفته QD-OLED در بازی‌ها برتری را به دست آورید و تصاویری واضح و سریع را تجربه کنید"
    },
    price: 650,
    category: {
      en: 'Monitors',
      fa: 'مانیتورها'
    },
    specs: {
      processor: "49 inch",
      gpu: "4K 120 hertz",
      ram: "OLED",
      storage: "Asus"
    }
  },

  {
    id: 'ROG STRIX XG43UQ',
    name: {
      en: "ROG STRIX XG43UQ",
      fa: "مانیتور گیمینگ 43 اینچ ایسوس"
    },
    image: "https://i.imgur.com/On8Irxz.jpeg",
    shortDescription: {
      en: "ASUS is one of the companies that manufactures gaming monitors. In recent years, the company has gained a significant market share by producing high-quality monitors and making them available to the market. The ASUS ROG STRIX XG43UQ 43-inch display is one of these monitors. This 43-inch display is suitable for use in large rooms. The response time range for this monitor is between 1 and 3 milliseconds. The backlight is of the LED type. Its resolution is 3840x2160 pixels, and the refresh rate is 144Hz.",
      fa: "شرکت ایسوس از شرکت های تولید کننده مانیتورهای گیمینگ است. این شرکت طی سال‌های اخیر با تولید مانیتور یا نمایشگرهای با کیفیت و ارائه آن‌ها به بازار توانسته است سهم قابل توجهی از بازار را به دست بیاورد. نمایشگر ایسوس مدل ROG STRIX XG43UQ سایز 43 اینچ از جمله همین نمایگرهاست. این نمایشگر 43 اینچ بوده و می‌توان از آن برای سالن‌های بزرگ استفاده کرد. محدوده زمان پاسخ گویی برای این مانیتور در حدود 1 تا3 میلی‌ثانیه است. نور پس زمینه در این مانیتور از نوع LED است. رزولوشن آن 3840x2160 پیکسل است. همچنین نرخ به روز رسانی تصویر 144 هرتز خواهد بود."
    },
    price: 549,
    category: {
      en: 'Monitors',
      fa: 'مانیتورها'
    },
    specs: {
      processor: "43 inch",
      gpu: "1440p 240 hertz",
      ram: "Flat screen",
      storage: "Asus"
    }
  },
  {
    id: 'ZERO Mouse and Keybord',
    name: {
      en: "ZERO Mouse and Keybord",
      fa: "کیبورد و موس بی سیم گیزر"
    },
    image: "https://i.imgur.com/2scQvbJ.jpeg",
    shortDescription: {
      en: "The GEEZER ZERO Wireless Keyboard and Mouse set is a beautiful combination with a unique design and a wide range of warm and attractive colors, catering to every taste. Its ergonomic design ensures comfortable and efficient typing while reducing pressure on the hands. If the keyboard is not used for more than a minute, it enters sleep mode, which helps extend battery life and can be easily reactivated by pressing any key.Additionally, the keyboard keys are detachable, allowing you to clean them with a brush included in the package whenever needed. This keyboard is capable of completing various commands quickly and provides a smooth, uninterrupted typing experience. The silent mouse is compact, shiny, and comfortable, designed to fit the palm's curvature for prolonged use.The keyboard has 104 keys, and the mouse has 4 buttons. The keyboard's dimensions are 38 × 138 × 468 mm, and the mouse's dimensions are 38 × 104 × 68 mm..",
      fa: "کیبورد و موس بی سیم GEEZER مدل ZERO یک ست کیبورد و موس بسیار زیباست که با طراحی منحصر به فرد خود و با داشتن تنوع رنگ بسیار گرم و زیبا پاسخگوی هر نوع سلیقه می باشد. طراحی ارگونومیک آن باعث تایپ راحت و کارآمد می شود و فشار روی دست ها را کاهش می دهد.اگر بیش از یک دقیقه از صفحه‌کلید استفاده نکنید، صفحه‌کلید به حالت خواب می‌رود که به خوبی عمر باتری را افزایش می‌دهد و با زدن یک کلید دوباره روشن می شود.همچنین کلیدهای کیبورد قابلیت جدا شدن دارند که با یک برس که در پک قرار دارد میتوانید هر زمان که نیاز بود آن را تمیز کنید. این کیبورد می تواند به سرعت دستورات مختلف را تکمیل کند و تجربه تایپ روان و بدون وقفه ای را ارائه دهد. موس سایلنت این ست فوق العاده جمع و جور، براق و راحت است و برای استفاده راحت در مدت زمان طولانی در انحنای کف دست قرار می گیرد.تعداد کلیدهای کیبورد 104 عدد و تعداد کلیدهای ماوس 4عدد می باشد و اندازه کیبورد 38 × 138× 468 MM و اندازه ماوس 38× 104 × 68 MM است."
    },
    price: 399,
    category: {
      en: 'Mouse & Keyboards',
      fa: 'موس و کیبورد'
    },
    specs: {
      processor: "764 g",
      gpu: "Compatible with all the devices",
      ram: "Wireless Technology",
      storage: "Works for up to 10 meters"
    }
  },
  {
    id: 'V2 Pro PUBG',
    name: {
      en: "V2 Pro PUBG",
      fa: "ماوس گیمینگ بی‌سیم ریزر "
    },
    image: "https://i.imgur.com/nl8PiId.jpeg",
    shortDescription: {
      en: "If you're looking for an incredibly lightweight and high-performance mouse, the Razer Viper V2 Pro is an exceptional choice. This mouse is nearly 22% lighter than the Razer Viper Ultimate, bringing a new level of speed and control to your game. Loved by the top esports professionals worldwide, it allows you to play with the highest precision and speed possible. The new switches, with an improved lifespan of 90 million clicks and the complete elimination of unwanted click issues, offer incredible speed with a 0.2 millisecond response time and no latency, providing a level of performance built specifically for professional competitions. With a connection that’s 25% faster than any other wireless technology on the market, enjoy a competitive gaming experience with high performance and low latency. This connection remains smooth and stable even in crowded environments with multiple wireless signals.",
      fa: "اگر به‌دنبال یک موس فوق العاده سبک و با کارایی بالا هستید، Razer Viper V2 Pro انتخابی بی‌نظیر است. این موس با وزن تقریباً ۲۲ درصد سبک‌تر از ریزر Viper Ultimate سطح جدیدی از سرعت و کنترل را برای شما به ارمغان می‌آورد. این ویژگی که مورد علاقه بهترین بازیکنان حرفه‌ای ورزش‌های الکترونیکیدر سراسر جهان است، به شما امکان می‌دهد تا با بالاترین دقت و سرعت ممکن بازی کنید.ین سوییچ‌های جدید با طول عمر بهبود یافته ۹۰ میلیون کلیک و حذف کامل مشکلات کلیک‌های ناخواسته، به همراه سرعت فوق العاده ۰.۲ میلی‌ثانیه و بدون تأخیر، سرعتی را برای شما به ارمغان می‌آورد که کاملاً برای رقابت‌های حرفه‌ای ساخته شده است.با اتصالی ۲۵ درصد سریع‌تر از هر تکنولوژی بی‌سیم دیگری که در بازار وجود دارد، از تجربه‌ بازی رقابتی با کارایی بالا و تأخیر کم لذت ببرید. این اتصال حتی در محیط‌های شلوغ با امواج بی‌سیم متعدد نیز، نرم و باثبات باقی می‌ماند."
    },
    price: 199,
    category: {
      en: 'Mouse & Keyboards',
      fa: 'موس و کیبورد'
    },
    specs: {
      processor: "57 g",
      gpu: "30000 dpi",
      ram: "Wireless Technology",
      storage: "72 hours of battery life"
    }
  },
  {
    id: 'B16 Keyboard',
    name: {
      en: "B16 Keyboard",
      fa: "کیبورد مخصوص بازی فرست بلاد انلی"
    },
    image: "https://i.imgur.com/68FC3Dl.jpeg",
    shortDescription: {
      en: "The design of this keyboard saves space while maintaining the number keys, making it compact and comfortable. This ergonomic keyboard with multifunctional keys is very comfortable, perfect for long typing sessions and gaming. It features an attractive color scheme and design, as well as a backlight.",
      fa: "در طراحی این کیبورد با توجه به حفظ کلیدهای شماره، در فضا صرفه جویی شده و کاملا جمع و جور و راحت است این صفحه کلید ارگونومیک با کلیدهای چند منظوره است بسیار راحت، مناسب برای تایپ های طولانی و بازی می باشد دارای رنگ بندی و طراحی بسیار جذاب و همچنین نور پس زمینه نیز هست"
    },
    price: 2599,
    category: {
      en: 'Mouse & Keyboards',
      fa: 'موس و کیبورد'
    },
    specs: {
      processor: "61 Keys",
      gpu: "Compatible with all the devices",
      ram: "Ultra Fast Wire Technology",
      storage: "170 cm of Cable length"
    }
  }
];

