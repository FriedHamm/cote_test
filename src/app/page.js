import Image from "next/image";
import TextEditor from "@/components/texteditor/TextEditor";
import HeroSection from "@/components/main page/HeroSection";
import CourseSection from "@/components/main page/CourseSection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <CourseSection/>
    </>
  );
}
