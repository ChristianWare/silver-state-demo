import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <main>
      <h1>header 1</h1>
      <h2>header 2</h2>
      <h3>header 3</h3>
      <h4>header 4</h4>
      <h5>header 5</h5>
      <h6>header 6</h6>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos expedita quis cum porro dignissimos harum, sed maxime, magni autem cupiditate aperiam fugiat quidem neque ex, sequi eveniet explicabo omnis obcaecati?</p>
    </main>
  );
}
