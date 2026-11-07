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
      <h1>Silver State <br /> Black Car</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos expedita
        quis cum porro dignissimos harum, sed maxime, magni autem cupiditate
        aperiam fugiat quidem neque ex, sequi eveniet explicabo omnis obcaecati?
      </p>
    </main>
  );
}
