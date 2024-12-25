"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  FaCheck,
  FaLeaf,
  FaHammer,
  FaLaptopCode,
  FaChevronDown,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "./components/Navbar";

export default function Home() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600 });
  }, []);

  const services = [
    {
      title: "Sprzątanie",
      description: "Profesjonalne porządki w Twoim domu",
      icon: <FaLeaf className="text-emerald-500 text-4xl mb-4" />,
    },
    {
      title: "Naprawy domowe",
      description: "Fachowa pomoc w każdej awarii",
      icon: <FaHammer className="text-emerald-500 text-4xl mb-4" />,
    },
    {
      title: "Ogrodnictwo",
      description: "Twój ogród w najlepszych rękach",
      icon: <FaLeaf className="text-emerald-500 text-4xl mb-4" />,
    },
    {
      title: "Usługi IT",
      description: "Wsparcie technologiczne na najwyższym poziomie",
      icon: <FaLaptopCode className="text-emerald-500 text-4xl mb-4" />,
    },
  ];

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faq = [
    {
      question: "Czy mogę zarezerwować usługę na dowolny termin?",
      answer:
        "Tak, nasza platforma pozwala Ci wybrać dogodny termin z kalendarza dostępnych specjalistów.",
    },
    {
      question: "Czy specjaliści są sprawdzeni?",
      answer:
        "Weryfikujemy naszych dostawców, a także klienci wystawiają opinie i oceny, dzięki czemu możesz mieć pewność, że korzystasz z sprawdzonych usług.",
    },
    {
      question: "Jak wygląda płatność?",
      answer:
        "Płatności możesz dokonać online lub bezpośrednio u specjalisty, w zależności od wybranej usługi.",
    },
    {
      question: "Czy mogę odwołać rezerwację?",
      answer:
        "Tak, możesz odwołać lub przesunąć termin zgodnie z zasadami danej usługi.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* HERO SECTION */}
        <header className="py-24 bg-gradient-to-r from-emerald-100 to-teal-100 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              data-aos="fade-up"
              className="text-5xl font-extrabold text-emerald-700"
            >
              Lokalny Serwis <br /> w Twoich Rękach
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-6 text-gray-700 max-w-2xl mx-auto text-xl"
            >
              Znajdź zaufanych profesjonalistów w swojej okolicy. Od sprzątania,
              przez naprawy, po ogrodnictwo i usługi IT.
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-10 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition"
            >
              Przeglądaj Usługi
            </button>
          </div>
        </header>

        {/* ABOUT SECTION */}
        <section className="py-24 bg-white" data-aos="fade-up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">O nas</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Jesteśmy platformą łączącą specjalistów i klientów. Naszą misją
              jest ułatwienie procesu wyszukiwania i zamawiania usług. Z nami
              oszczędzisz czas i zyskasz pewność, że trafiasz na sprawdzonych
              fachowców, gotowych, by sprostać Twoim potrzebom.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24" data-aos="fade-up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-700 mb-12">
              Jak to działa?
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mb-4">
                  <span className="text-2xl font-bold text-emerald-700">1</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  Znajdź usługę
                </h3>
                <p className="text-gray-600">Przeglądaj ofertę specjalistów.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mb-4">
                  <span className="text-2xl font-bold text-emerald-700">2</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  Zarezerwuj termin
                </h3>
                <p className="text-gray-600">
                  Wybierz dogodny czas i umów wizytę.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mb-4">
                  <span className="text-2xl font-bold text-emerald-700">3</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  Ciesz się usługą
                </h3>
                <p className="text-gray-600">
                  Specjalista wykona zadanie na najwyższym poziomie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-white" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-700 mb-12">
              Popularne Usługi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center">
                    {service.icon}
                    <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24" data-aos="fade-up">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-emerald-700 text-center mb-10">
              Najczęściej Zadawane Pytania
            </h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-6 cursor-pointer"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-emerald-700">
                      {item.question}
                    </h3>
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${
                        faqOpen === index ? "rotate-180" : ""
                      } text-emerald-700`}
                    />
                  </div>
                  {faqOpen === index && (
                    <p className="mt-4 text-gray-600">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-24 bg-gray-50" data-aos="fade-up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-700 mb-12">
              Pakiety Cenowe
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow p-8">
                <h3 className="text-xl font-bold text-emerald-700 mb-4">
                  Basic
                </h3>
                <p className="text-gray-600 mb-6">Dla małych zleceń</p>
                <div className="text-3xl font-extrabold text-emerald-800 mb-6">
                  49 zł
                </div>
                <ul className="text-gray-600 space-y-2 mb-8">
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Dostęp do
                    specjalistów
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Podstawowe wsparcie
                  </li>
                </ul>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition">
                  Wybierz
                </button>
              </div>
              <div className="bg-white rounded-xl shadow p-8 border-t-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-4">Pro</h3>
                <p className="text-gray-600 mb-6">Dla większych projektów</p>
                <div className="text-3xl font-extrabold text-emerald-800 mb-6">
                  149 zł
                </div>
                <ul className="text-gray-600 space-y-2 mb-8">
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Więcej specjalistów
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Priorytetowe
                    wsparcie
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Gwarancja
                    satysfakcji
                  </li>
                </ul>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition">
                  Wybierz
                </button>
              </div>
              <div className="bg-white rounded-xl shadow p-8">
                <h3 className="text-xl font-bold text-emerald-700 mb-4">
                  Premium
                </h3>
                <p className="text-gray-600 mb-6">Dla wymagających</p>
                <div className="text-3xl font-extrabold text-emerald-800 mb-6">
                  299 zł
                </div>
                <ul className="text-gray-600 space-y-2 mb-8 text-left">
                  <li className="flex items-center justify-center gap-1">
                    <FaCheck className="text-emerald-500" /> Pełen dostęp do
                    specjalistów
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Dedykowany opiekun
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <FaCheck className="text-emerald-500" /> Usługi premium i
                    dodatki
                  </li>
                </ul>
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition">
                  Wybierz
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="py-24 bg-white" data-aos="fade-up">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">
              Zapisz się do Newslettera
            </h2>
            <p className="text-gray-600 mb-8">
              Otrzymuj najnowsze oferty i informacje prosto na swoją skrzynkę!
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                placeholder="Twój email"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full flex items-center justify-center gap-2 transition"
              >
                <FaPaperPlane />
                Subskrybuj
              </button>
            </form>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          className="py-24 bg-emerald-100 text-center"
          data-aos="fade-up"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-emerald-700 mb-6">
              Dołącz do nas już dziś!
            </h2>
            <p className="text-gray-600 mb-8">
              Skorzystaj z naszej platformy i przekonaj się, jak łatwo jest
              znaleźć niezawodnych specjalistów. Działaj bez stresu.
            </p>
            <button className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition">
              Załóż Konto
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-emerald-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Local Services</h3>
              <p className="text-gray-200">
                &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100 mb-2">Nawigacja</h4>
              <ul className="space-y-1 text-gray-200">
                <li>
                  <a href="#">Strona główna</a>
                </li>
                <li>
                  <a href="#">O nas</a>
                </li>
                <li>
                  <a href="#">Kontakt</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100 mb-2">Obserwuj nas</h4>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="p-2 bg-emerald-800 hover:bg-emerald-700 rounded-full"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 hover:bg-emerald-700 rounded-full"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 hover:bg-emerald-700 rounded-full"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="p-2 bg-emerald-800 hover:bg-emerald-700 rounded-full"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
