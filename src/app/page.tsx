import CountDown from "./Components/Countdown";
import ThemeSwitcher from "./Components/ThemeSwitcher/intex";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-black dark:text-white light:bg-white light:text-black transition-colors transition-normal duration-700 red:bg-red-500 blue:bg-blue-500">
      <main className="flex flex-col gap-[32px] row-start-2 items-center content-center font-sans">
        <ThemeSwitcher />
        <h1 className="md:text-7xl font-bold text-center uppercase text-2xl">Día de la hostias</h1>
        <CountDown />
      </main>
    </div>
  );
}
