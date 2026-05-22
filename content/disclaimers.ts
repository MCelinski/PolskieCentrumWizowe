type Lang = "pl" | "en" | "ua" | "ru";

export interface Disclaimers {
  full: string;
  short: string;
}

const disclaimers: Record<Lang, Disclaimers> = {
  pl: {
    full: "Polskie Centrum Wizowe jest prywatnym podmiotem gospodarczym prowadzącym działalność doradczą na zasadach komercyjnych. Nie stanowimy organu administracji publicznej Rzeczypospolitej Polskiej, jednostki sektora finansów publicznych, ani podmiotu powiązanego organizacyjnie lub kapitałowo ze Skarbem Państwa. Świadczone przez nas usługi mają charakter doradztwa prawnego i administracyjnego; postępowania o uzyskanie wiz, zezwoleń na pobyt, zezwoleń na pracę oraz obywatelstwa polskiego prowadzone są przez właściwe organy administracji — konsulaty, wojewodów, Urząd do Spraw Cudzoziemców, Prezydenta Rzeczypospolitej Polskiej oraz inne organy ustawowo uprawnione.",
    short: "Polskie Centrum Wizowe jest prywatnym podmiotem doradczym. Nie stanowimy organu administracji państwowej Rzeczypospolitej Polskiej.",
  },
  en: {
    full: "Polskie Centrum Wizowe is a private commercial entity providing advisory services on commercial terms. We are not a public administration body of the Republic of Poland, a unit of the public finance sector, nor an entity organizationally or capital-affiliated with the State Treasury. Our services constitute legal and administrative advisory; proceedings for visas, residence permits, work authorization and Polish citizenship are conducted by the competent administrative authorities — consulates, voivodes, the Office for Foreigners (Urząd do Spraw Cudzoziemców), the President of the Republic of Poland, and other authorities empowered by statute.",
    short: "Polskie Centrum Wizowe is a private advisory firm. We are not a public administration body of the Republic of Poland.",
  },
  ua: {
    full: "Polskie Centrum Wizowe є приватним комерційним суб’єктом, який надає консультаційні послуги на комерційних умовах. Ми не є органом державної адміністрації Республіки Польща, одиницею сектора державних фінансів, ані суб’єктом, організаційно або капітально пов’язаним зі Скарбом Держави. Послуги, які ми надаємо, мають характер юридичної та адміністративної консультації; провадження щодо отримання віз, дозволів на проживання, дозволів на роботу та польського громадянства ведуться компетентними адміністративними органами — консульствами, воєводами, Управлінням у справах іноземців (Urząd do Spraw Cudzoziemców), Президентом Республіки Польща та іншими органами, уповноваженими законом.",
    short: "Polskie Centrum Wizowe є приватною консультаційною фірмою. Ми не є органом державної адміністрації Республіки Польща.",
  },
  ru: {
    full: "Polskie Centrum Wizowe является частным коммерческим субъектом, оказывающим консультационные услуги на коммерческих условиях. Мы не являемся органом государственной администрации Республики Польша, единицей сектора государственных финансов, а также субъектом, организационно или капитально связанным с Государственной казной. Услуги, которые мы предоставляем, носят характер юридической и административной консультации; производства по получению виз, разрешений на пребывание, разрешений на работу и польского гражданства ведутся компетентными административными органами — консульствами, воеводами, Управлением по делам иностранцев (Urząd do Spraw Cudzoziemców), Президентом Республики Польша и другими органами, уполномоченными законом.",
    short: "Polskie Centrum Wizowe является частной консультационной фирмой. Мы не являемся органом государственной администрации Республики Польша.",
  },
};

export default disclaimers;
